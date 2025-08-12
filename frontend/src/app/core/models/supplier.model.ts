export interface Supplier {
    id: number
    name: string
    email?: string
    type: "API" | "EXCEL" | "SOAP" | "CSV"
    apiUrl?: string
    apiKey?: string
    authMethod?: string
    filePath?: string
    fileName?: string
    wsdlUrl?: string
    namespace?: string
    username?: string
    password?: string
    operation?: string
    url?: string
    active: boolean
    createdAt?: string
    updatedAt?: string
}
