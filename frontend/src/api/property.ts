export interface PropertyResponse {
    address: string
    estimatedValue: number
    bedrooms: number
    bathrooms: number
    carSpaces: number
    landSize: number
    propertyType: string
    lastSoldPrice: number
    lastSoldDate: string
  }
  
  export async function fetchProperty(address: string): Promise<PropertyResponse> {
    const res = await fetch(`http://localhost:8080/api/property?address=${encodeURIComponent(address)}`)
    if (!res.ok) throw new Error('Property not found')
    return res.json()
  }