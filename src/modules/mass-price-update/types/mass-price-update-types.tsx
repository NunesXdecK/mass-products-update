export interface ProductFromDB {
    code: number,
    cost_price: number,
    name: string,
    sales_price: number,
}

export interface PacksFromDB {
    id: number,
    pack_id: number,
    product_id: number,
    qty: number,
}

export interface ProductForCSV {
    newValue: string,
    productCode: string
}

export interface ProductForTable extends ProductFromDB {
    newValue: number | string | null,
    quantity: number,
    isPack: boolean,
}

export interface InvalidProps {
    message: string
    invalid: boolean
}