import { useState } from "react"

import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Checkbox from "@mui/material/Checkbox"

import { items } from "appConstants"
import { groupArray } from "helpers"
import { Item } from "types/item"

const Home = () => {
    const [groupedItems, setGroupedItems] = useState(() => groupArray({ items }))

    const handleItemToggle = ({ id, key }: { id: number; key: string }) => {
        const toggleditems = groupedItems[key].items.map((toggleItem: Item) => (toggleItem.id === id ? { ...toggleItem, selected: !toggleItem.selected } : toggleItem))
        setGroupedItems({ ...groupedItems, [key]: { ...groupedItems[key], items: toggleditems } })
    }

    const handleCategoryToggle = ({ key }: { key: string }) => {
        const toggleditems = groupedItems[key].items.map((toggleItem: Item) => ({ ...toggleItem, selected: !groupedItems[key].selected }))
        setGroupedItems({ ...groupedItems, [key]: { items: toggleditems, selected: !groupedItems[key].selected } })
    }

    return (
        <Container>
            <Typography>Add Tax</Typography>

            {Object.keys(groupedItems).map((key) => {
                return (
                    <>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h4">{key}</Typography>
                            </Grid>
                            <Grid item>
                                <Button onClick={() => handleCategoryToggle({ key })}>toggle</Button>
                            </Grid>
                        </Grid>
                        {groupedItems[key].items.map(({ name, selected, id }: Item) => {
                            return (
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Checkbox checked={selected} />
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={() => handleItemToggle({ id, key })}>toggle</Button>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            {id} - {name}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>{JSON.stringify(selected)}</Typography>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </>
                )
            })}
        </Container>
    )
}

export default Home
