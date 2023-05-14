import React from 'react';
import { MassPriceUpdateLabels as l } from './../labels/mass-price-update';
import { ProductForTable } from '../types/mass-price-update-types';
import { handleValidateProduct } from '../utils/mass-price-update-utils';

interface Props {
    list: ProductForTable[]
    canValidate: boolean
}

function MassPriceUpdateTable({ list, canValidate }: Props) {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-sm text-center">
                <thead>
                    <tr>
                        <th scope="col">{l.warning}</th>
                        <th scope="col">{l.code}</th>
                        <th scope="col">{l.name}</th>
                        <th scope="col">{l.unit}</th>
                        <th scope="col">{l.actualPrice}</th>
                        <th scope="col">{l.newPrice}</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((p, index) => {
                        const invalid = canValidate ? handleValidateProduct(p) : { invalid: false, message: '' }
                        return (
                            <tr key={index}>
                                <td className={invalid.invalid ? 'text-danger' : ''}>{invalid.invalid ? (<img src='../../../../../images/icon-warning.svg' alt='' title={invalid.message} />) : ''}</td>
                                <td className={invalid.invalid ? 'text-danger' : ''}>{p?.code ?? 0}</td>
                                <td className={invalid.invalid ? 'text-danger' : ''}>{p?.name ?? ''}</td>
                                <td className={invalid.invalid ? 'text-danger' : ''}>{p?.isPack ? 'PC' : 'UN'}</td>
                                <td className={invalid.invalid ? 'text-danger' : ''}>{p?.sales_price ?? 0}</td>
                                <td className={invalid.invalid ? 'text-danger' : ''}>{p.newValue ?? 0}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default MassPriceUpdateTable;
