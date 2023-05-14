import React, { ChangeEvent, useState } from 'react';
import { MassPriceUpdateLabels as l } from './labels/mass-price-update';
import MassPriceUpdateTable from './components/mass-price-update-table';
import { ProductForCSV, ProductForTable, ProductFromDB } from './types/mass-price-update-types';
import useProducts from './hooks/use-products';
import usePacks from './hooks/use-packs';
import { handleValidateProducts } from './utils/mass-price-update-utils';

function MassPriceUpdate() {
  const { productLoading, products } = useProducts()
  const { packLoading, packs } = usePacks()
  const [key, setKey] = useState(0);

  const [list, setList] = useState<ProductForTable[]>([])
  const [canValidate, setCanValidate] = useState<boolean>(false)

  const handlePopulateList = (p: ProductForCSV): ProductForTable => {
    const pack = packs.find(pp => Number(p.productCode) === pp.pack_id)
    const isPack = pack?.id !== undefined
    const productFromDB: ProductFromDB | undefined = products.find(pp => Number(p.productCode) === pp.code)
    const product: ProductForTable = {
      name: productFromDB?.name ?? '',
      code: productFromDB?.code ?? 0,
      cost_price: productFromDB?.cost_price ?? 0,
      sales_price: productFromDB?.sales_price ?? 0,
      newValue: p.newValue,
      isPack: isPack,
      quantity: pack?.qty ?? 1
    }
    return product
  }

  const handleCVSFile = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!event?.target?.files) return
    const file = event?.target?.files[0]
    if (!file) {
      setList([])
      return
    }
    const reader = new FileReader();
    reader.onload = () => {
      const csvData = reader.result as string;
      if (!csvData) return
      const lines = csvData?.replaceAll('\r', '').split('\n')
      const headers = lines[0].split(',')
      const results = []
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].split(',')
        if (line.length === headers.length) {
          const obj: { [key: string]: string } = {}
          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = line[j].trim()
          }
          results.push(obj)
        }
      }
      const list: ProductForTable[] = results.map(p => {
        return handlePopulateList({ newValue: p.new_price, productCode: p.product_code })
      })
      setList(old => list)
    };
    reader.readAsText(file)
  }

  const handleCheckPacks = (): any[] => {
    let dataExtra: any = []
    const data = list.map((p) => {
      if (p.isPack) {
        let prods: any = []
        const ps = packs.filter(pa => p.code === pa.pack_id)
        ps.forEach((pss) => {
          prods.push(products.find(pp => pss.product_id === pp.code))
        })
        dataExtra = [
          ...dataExtra,
          ...prods.map((pp: any) => {
            const pack = packs.find(pa => p.code === pa.pack_id && pp.code === pa.product_id)
            if (!p?.newValue || !pack?.qty || !ps?.length) return
            const value = ((Number(p?.newValue) / pack?.qty) / ps?.length)
            return {
              id: pp?.code?.toString(),
              value: value.toString()
            }
          })]
      } else {
        const ps = packs.filter(pa => p.code === pa.product_id)
        ps.forEach(pc => {
          const packExtra = dataExtra.find((de: any) => de.id.toString() === pc.pack_id.toString())
          const packL = list.find(pe => pe.code === pc.pack_id)
          const packP = products.find(pe => pe.code === pc.pack_id)
          let packValue = 0
          if (packExtra?.id > 0) {
            packValue = packExtra.value
          } else if (packL?.code && packL.code > 0) {
            packValue = packL?.sales_price ?? 0
          } else {
            packValue = packP?.sales_price ?? 0
          }
          const oldProdValue = (Number(p.sales_price) * pc.qty)
          const newProdValue = (Number(p.newValue) * pc.qty)
          const finalValue = (packValue - oldProdValue) + newProdValue
          dataExtra = [
            ...dataExtra,
            {
              id: pc?.pack_id?.toString(),
              value: finalValue?.toString()
            }]
        })
      }
      return {
        id: p.code.toString(),
        value: p.newValue?.toString()
      }
    })

    let dataFinal: any = []
    const dataExtraFinal = [...data, ...dataExtra]
    dataExtraFinal.forEach(e => {
      const f = dataFinal.find((ff: any) => e.id === ff.id)
      if (f?.id > 0) {
        const index = dataFinal.indexOf(f)
        dataFinal[index] = {
          id: e.id,
          value: Number(e.value).toFixed(2).toString()
        }
      } else {
        dataFinal.push({
          id: e.id,
          value: Number(e.value).toFixed(2).toString()
        })
      }
    })
    return dataFinal;
  }

  const handleSend = async () => {
    try {
      const data = handleCheckPacks()
      const res = await fetch('http://localhost:4000/api/update-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .catch(error => {
          console.error('Ocorreu um erro:', error);
        })
      if (res.status === "SUCCESS") {
        setKey(old => old + 1)
        setList([])
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (productLoading || packLoading) return <>carregando...</>

  return (
    <main>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom p-2">
        <h1 className="h2">{l.updatePrices}</h1>
      </div>
      <form className="p-2 d-flex justify-content-between">
        <fieldset>
          <label htmlFor="input-csv">{l.selectCVS}</label><br />
          <input
            type="file"
            id="input-csv"
            className="form-control"
            onChange={handleCVSFile}
            key={key}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
          <span>{l.quantityItems + ': ' + list.length}</span>
        </fieldset>
        <div className="align-items-center">
          <button className="btn btn-secondary mx-1" type="button" onClick={() => setCanValidate(old => !old)}>{l.validate}</button>
          <button className="btn btn-primary mx-1" type="button" disabled={handleValidateProducts(list)} onClick={handleSend}>{l.update}</button>
        </div>
      </form>
      <MassPriceUpdateTable
        list={list}
        canValidate={canValidate}
      />
    </main>
  );
}

export default MassPriceUpdate;
