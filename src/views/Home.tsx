import { useState } from "react"
import { Formik } from "formik"
import * as Yup from "yup"

import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Checkbox from "@mui/material/Checkbox"
import TextField from "@mui/material/TextField"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputAdornment from "@mui/material/InputAdornment"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Button from "@mui/material/Button"

import { items } from "appConstants"
import { groupArray } from "helpers"
import { Item } from "types/item"
import { Box } from "@mui/system"

const Home = () => {
    const [groupedItems, setGroupedItems] = useState(() => groupArray({ items }))
    const [totalTax, setTotalTax] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)

    const handleItemToggle = ({ id, key }: { id: number; key: string }) => {
        const toggleditems = groupedItems[key].items.map((toggleItem: Item) => (toggleItem.id === id ? { ...toggleItem, selected: !toggleItem.selected } : toggleItem))
        setGroupedItems({ ...groupedItems, [key]: { ...groupedItems[key], items: toggleditems } })
    }

    const handleCategoryToggle = ({ key }: { key: string }) => {
        const toggleditems = groupedItems[key].items.map((toggleItem: Item) => ({ ...toggleItem, selected: !groupedItems[key].selected }))
        setGroupedItems({ ...groupedItems, [key]: { items: toggleditems, selected: !groupedItems[key].selected } })
    }

    const handleFormSubmit = async (values: any) => {
        let currenttotalTax = 0
        let currenttotal = 0

        Object.keys(groupedItems).forEach((key) => {
            groupedItems[key].items.forEach(({ selected, amount }: Item) => {
                if (selected) {
                    currenttotalTax += ((values?.taxValue || 0) / 100) * amount
                    currenttotal += amount
                }
            })
        })

        setTotalTax(currenttotalTax)
        setTotal(currenttotal)
    }
    return (
        <Container>
            <Typography>Add Tax</Typography>

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={{
                    taxName: "",
                    taxValue: null,
                }}
                validationSchema={Yup.object().shape({
                    taxName: Yup.string().required("Enter Tax Name"),
                    taxValue: Yup.number().min(0).max(100).typeError("must be a number"),
                })}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => {
                    return (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    {/* taxName */}
                                    <Box p={1}>
                                        <TextField value={values.taxName} fullWidth name="taxName" disabled={isSubmitting} onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="Tax Name" />
                                        {touched.taxName && errors.taxName && <Typography style={{ color: "red", fontSize: "12px" }}>{errors.taxName}</Typography>}
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    {/* taxValue */}
                                    <Box p={1}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password">Vat Value</InputLabel>
                                            <OutlinedInput endAdornment={<InputAdornment position="end">%</InputAdornment>} type="number" value={values.taxValue} fullWidth name="taxValue" disabled={isSubmitting} onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="Tax Discount" />
                                            {touched.taxValue && errors.taxValue && <Typography style={{ color: "red", fontSize: "12px" }}>{errors.taxValue}</Typography>}
                                        </FormControl>
                                    </Box>
                                </Grid>
                            </Grid>
                            {Object.keys(groupedItems).map((key) => {
                                return (
                                    <>
                                        <hr />
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                <Checkbox color="secondary" size="medium" onClick={() => handleCategoryToggle({ key })} checked={groupedItems[key].selected} />
                                            </Grid>
                                            <Grid item style={{ flexGrow: 1 }}>
                                                <Typography variant="h4">{key}</Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography>Cost</Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography>Tax</Typography>
                                            </Grid>
                                        </Grid>
                                        <hr />

                                        {groupedItems[key].items.map(({ id, name, selected, amount }: Item) => {
                                            return (
                                                <Grid container alignItems="center">
                                                    <Grid item>
                                                        <Checkbox color="secondary" size="small" onClick={() => handleItemToggle({ id, key })} checked={selected} />
                                                    </Grid>
                                                    <Grid item style={{ flexGrow: 1 }}>
                                                        <Typography>{name}</Typography>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Typography>{amount} $</Typography>
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <Typography>{selected ? (((values?.taxValue || 0) / 100) * amount).toFixed(2) : 0} $</Typography>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })}
                                    </>
                                )
                            })}

                            <Grid sx={{ margin: "16px 0px" }} container>
                                <Grid item sx={{ flexGrow: 1 }}>
                                    {Boolean(totalTax) && (
                                        <Typography variant="h4">
                                            Total Taxs:<strong> {totalTax?.toFixed(2)} $</strong>
                                        </Typography>
                                    )}
                                </Grid>

                                <Grid item>
                                    <Button type="submit" variant="contained">
                                        Apply Tax to 6 item(s)
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid sx={{ margin: "16px 0px" }} container>
                                {Boolean(total) && (
                                    <Grid item sx={{ flexGrow: 1 }}>
                                        <Typography variant="h4">
                                            Total Item: <strong>{total?.toFixed(2)} $</strong>
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                            <Grid sx={{ margin: "16px 0px" }} container>
                                <Grid item sx={{ flexGrow: 1 }}>
                                    {Boolean(total) && Boolean(totalTax) && (
                                        <Typography variant="h4">
                                            Total: <strong>{(total + totalTax).toFixed(2)} $</strong>
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </form>
                    )
                }}
            </Formik>
        </Container>
    )
}

export default Home
