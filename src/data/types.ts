export type Organization = {
    name: string
    license: string
    logo: string
}

export type CustomerRequirements = {
    documents: number
    age: number
    manAgeAtRepayment: number
    femaleAgeAtRepayment: number
    lastExperience: number
    fullExperience: number
    salary: number
}

export type FromTo = {
    from: number
    to?: number
}

export type Period = {
    rate: FromTo
    termUnit: string
    term: FromTo
    isFloatingRate: boolean
}

export type Rate = {
    periods: Period[]
    currency: string
    creditAmount: FromTo
    initialAmount: FromTo
}

export type InformBlock = {
    name: string
    alias: string
    organization: Organization
    customerRequirements: CustomerRequirements
    rate: Rate
}
