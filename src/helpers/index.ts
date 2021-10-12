import { Item } from "types/item"

interface Group {
    [key: string]: {
        selected: boolean
        items: Item[]
    }
}

export const groupArray = ({ items }: { items: Item[] }) => {
    const group: Group = {}

    items.forEach((item: Item) => {
        if (item?.category?.name) {
            // logic here
            if (!group[item?.category?.name]?.items) {
                group[item?.category?.name] = { selected: false, items: [] }
            }

            group[item.category.name].items = [...group[item?.category?.name].items, { ...item, selected: false }]
        } else {
            if (!group["other"]?.items) {
                group["other"] = { selected: false, items: [] }
            }

            group["other"].items = [...group["other"].items, { ...item, selected: false }]
        }
    })

    return group
}
