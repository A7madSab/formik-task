export interface Image {
    id: number
    upload_path: string
    metadata: {}
    url: string
}

export interface EndsOptions {
    type: string
    payment_count: number
}

export interface StartOptions {
    type: string
}

export interface RecurringOption {
    ends: EndsOptions
    start: StartOptions
    repeatInterval: string
}

export interface Recurring {
    enabled: boolean
    options: EndsOptions & StartOptions & RecurringOption
}

export interface Enable {
    enabled: boolean
}

export interface Options {
    recurring?: Enable & Recurring
    makeAvailableQuantityPublic: boolean
}

export interface Category {
    id: number
    name: string
    options: {}
}

export interface Item {
    id: number
    tab_id: number
    selected: boolean
    name: string
    amount: number
    amount_type: string
    allow_quantity: number | null
    deleted_at: string | null
    required: boolean
    created_at: string
    updated_at: string
    type: string
    position: number
    anchor: string | null
    parent_id: number | null
    catalog_object_id: number | null
    description: string | null
    available_quantity: number | null
    hidden: boolean
    options: Options | {}
    tsv: string
    quantity_sold: number
    amount_sold: number
    total_buyers: number
    quantity_refunded: number
    amount_discounted: number
    amount_refunded: number
    net_amount: number
    net_quantity: number
    subcategory: string | null
    images: Image[]
    category?: Category
}
