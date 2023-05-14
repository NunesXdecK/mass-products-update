import { InvalidProps, ProductForTable } from "../types/mass-price-update-types"
import { MassPriceUpdateLabels as l } from "../labels/mass-price-update"

export const handleValidateProduct = (product: ProductForTable): InvalidProps => {
    if (product.code === 0) return { invalid: true, message: l.productNotFind } as InvalidProps
    if (!product.cost_price) return { invalid: true, message: l.hasNoNewPrice } as InvalidProps
    if (!product.newValue) return { invalid: true, message: l.hasNoNewPrice } as InvalidProps
    if (Number.isNaN(Number(product.newValue))) return { invalid: true, message: l.newPriceInvalid } as InvalidProps
    const costPrice = product.cost_price
    const salesPrice = product.sales_price
    const newValue = Number(product.newValue)
    const isPriceLowerThanCost = costPrice > newValue
    const isPriceHigherThanTenPercent = (salesPrice * 1.1) < newValue
    return {
        invalid: isPriceLowerThanCost || isPriceHigherThanTenPercent,
        message: (isPriceLowerThanCost ? l.priceLowerThanCost + '\n' : '') +
            (isPriceHigherThanTenPercent ? l.priceHigherThanTenPercent : '')
    } as InvalidProps
}

export const handleValidateProducts = (products: ProductForTable[]): boolean => {
    if (products.length === 0) return true
    let isValid = false
    products.forEach((p) => {
        if (!isValid) {
            isValid = handleValidateProduct(p).invalid
        }
    })
    return isValid

}