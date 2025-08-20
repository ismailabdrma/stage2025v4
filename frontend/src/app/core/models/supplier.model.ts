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
    operationsMeta?: Array<{ operationName: string, soapAction: string, inputElement: string, outputElement: string }>
    paymentOperationName?: string
    refundOperationName?: string
    successOperationName?: string
    url?: string
    active: boolean
    createdAt?: string
    updatedAt?: string

    // Payment configuration
    hasOwnPaymentSystem?: boolean
    paymentApiEndpoint?: string
    commissionApiEndpoint?: string
    payoutFrequency?: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM'
    customPaymentSchedule?: string
    customPaymentDays?: string
    customPaymentHour?: number
    minimumPaymentAmount?: number
    maximumPaymentDelay?: number
}
