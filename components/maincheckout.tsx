import { useRouter } from "next/router"
import { translate } from "../locales/translate"
import { GetCartAction, RemoveItem, useAppDispatch, useAppSelector } from "../redux"
import axios from "axios"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { IMaskInput } from 'react-imask'
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import MoneyFormat from "./money-format"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Radio from "@mui/material/Radio"
import FormControl from "@mui/material/FormControl"
import { Masks } from "../src/common"
import { tt } from "../src/utils"

interface Details {
    fio: string,
    phone: string | undefined,
    city: string,
    shipping?: {
        company: string,
        dep?: string,
        index?: string
    }
    payment?: string
}

interface ODetails {
    id: number,
    code: number,
    name: string,
    amount: number,
    sum: number,
    discount: number,
    firmid: number
}

interface Order {
    details: string,
    odetails: ODetails[]
}

const MainCheckout: React.FC = () => {
    const { locale } = useRouter()
    const cart = useAppSelector((state: any) => state.cart)
    const dispatch = useAppDispatch()
    const [Cart, setCart] = useState<ODetails[]>([])
    const [Shipping, setShipping] = useState<string>('')
    const [DepIndex, setDepIndex] = useState<string>('')
    const [Error, setError] = useState<string>('')
    const posts: string[] = ['Нова пошта', 'Укрпошта']
    
    const checkoutSchema = yup.object().shape({
        fio: yup.string().trim()
            .required(translate('checkout.messages.required', locale)),
        phone: yup.string().trim()
            .required(translate('checkout.messages.required', locale))
            .matches(/^\+38\([0-9,\),-]+$/, translate('checkout.messages.required', locale))
            .matches(/^\+38\(\d{3}\)\d{3}\-\d{2}\-\d{2}$/, translate('checkout.messages.phone', locale)),
        city: yup.string().trim()
            .required(translate('checkout.messages.required', locale)),
        shipping: yup.string()
            .required(translate('checkout.messages.shipping', locale)),
        payment: yup.string()
            .required(translate('checkout.messages.paymant', locale))
    });
  
    const { control, register, formState: { errors, isValid }, getValues, watch } = useForm({
        mode: "onChange",
        resolver: yupResolver(checkoutSchema),
        defaultValues: {
            shipping: ''
        }
     })

    const shipping = watch('shipping')

    useEffect(() => {
        dispatch(GetCartAction(cart))
    }, [])

    useEffect(() => {
        if (cart.started) setCart(getDataFromCart(cart.cart))
    }, [cart.started])

    useEffect(() => {
        setShipping(shipping)
        setDepIndex('')
    }, [shipping])

    useEffect(() => {
        if (Error.length > 0) setError('')
    }, [shipping, watch('fio'), watch('phone'), watch('city'), watch('payment'), DepIndex])

    const getDetails = (): Details => {
        const res: Details = {
            fio: getValues('fio'),
            phone: getValues('phone'),
            city: getValues('city'),
            shipping: getValues('shipping').length ? {
                company: getValues('shipping'),
                dep: getValues('shipping').includes(posts[0])? DepIndex : undefined,
                index: getValues('shipping').includes(posts[1])? DepIndex : undefined
            } : undefined,
            payment: getValues('payment').length ? getValues('payment') : undefined
        }
        return res
    }

    const getDataFromCart = (cart:any[]): ODetails[] => {
        let items: ODetails[] = []
        cart.forEach((item:any)=>{
            items.push({ id: item.id, code: item.code, name: item.name, amount: item.iamount,
                sum: item.iamount>=item.dcount? item.iamount*item.price-(item.iamount*item.price*item.dpercent)/100 : item.iamount*item.price,
                discount: item.iamount>=item.dcount?item.dpercent:0, firmid: item.firm.id
            })
        })
        return items
    }

    const clearCart = (items:ODetails[]) => (items.forEach((item:ODetails) => dispatch(RemoveItem(item.id))))

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Cart.length > 0) {
            axios.post('order', { details: JSON.stringify(getDetails()), odetails: Cart} as Order).then(({data:Order}) => {
                // clearCart(Cart)
            }).catch(error => {
                setError(translate('checkout.messages.error', locale))
            })
        }
    }

    const onChangeDepIndexHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setDepIndex(e.target.value)
    }

    return (
        <main>
            <div className="container-simple">
                <div className="main-simple">
                    <div className="dialog-body">
                        <form className="dialog-form" onSubmit={onSubmitHandler}>
                            <div className="checkout-frame">
                                <h2>{translate('checkout.title', locale)}</h2>
                                <div className="form-row">
                                    <label htmlFor="fio" className="form-label" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis', WebkitLineClamp: 1, overflow: 'hidden', whiteSpace: 'normal' }}>{translate('checkout.fio', locale)}</label>
                                    <input
                                        {...register("fio")}
                                        id="fio"
                                        className={`checkout-input${errors.fio ? ' error-color' : ''}`}
                                        type="text"
                                        maxLength={100}
                                    />
                                    <div className="error-row">
                                        <p className="error-message">{`${errors.fio ? errors.fio.message : ''}`}</p>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="phone" className="form-label">{translate('checkout.phone', locale)}</label>
                                    <Controller
                                        control={control}
                                        name='phone'
                                        render={({field: { ref, ...field }}) => (
                                            <IMaskInput
                                                {...field}
                                                id='phone'
                                                className={`checkout-input${errors.phone ? ' error-color' : ''} phone`}
                                                mask={Masks.phone[1]}
                                            />
                                        )}
                                    />
                                    <div className="error-row">
                                        <p className="error-message">{`${errors.phone ? errors.phone.message : ''}`}</p>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="city" className="form-label" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis', WebkitLineClamp: 1, overflow: 'hidden', whiteSpace: 'normal' }}>{translate('checkout.city', locale)}</label>
                                    <input
                                        {...register("city")}
                                        id="city"
                                        className={`checkout-input${errors.city ? ' error-color' : ''}`}
                                        type="text"
                                        maxLength={80}
                                    />
                                    <div className="error-row">
                                        <p className="error-message">{`${errors.city ? errors.city.message : ''}`}</p>
                                    </div>
                                </div>
                                <div  className="form-row">
                                    <FormControl>
                                        <label className="form-label">{translate('checkout.shipping.title', locale)}</label>
                                        <Controller
                                            control={control}
                                            name='shipping'
                                            render={({field}) => (
                                                <RadioGroup
                                                    {...field}
                                                >
                                                    <FormControlLabel sx={{ mt: -1, mb: -1 }} value={posts[0]} control={<Radio color="primary" />} label={translate('checkout.shipping.new_post.title', locale)} />
                                                    <FormControlLabel sx={{ mt: -1, mb: -1 }} value={posts[1]} control={<Radio color="primary" />} label={translate('checkout.shipping.ukr_post.title', locale)} />
                                                </RadioGroup>
                                            )}
                                        />
                                        {Shipping.length > 0 &&<input
                                            className="checkout-input checkout-input-dep-index"
                                            placeholder={Shipping.includes(posts[0])?translate('checkout.shipping.new_post.dep', locale):Shipping.includes(posts[1])?translate('checkout.shipping.ukr_post.index', locale):''}
                                            maxLength={Shipping.includes(posts[0])?40:Shipping.includes(posts[1])?5:0}
                                            type="text"
                                            value={DepIndex}
                                            onChange={onChangeDepIndexHandler}
                                        />}
                                        <div className="error-row"/>
                                    </FormControl>
                                </div>
                                <div  className="form-row">
                                    <FormControl>
                                        <label className="form-label">{translate('checkout.payment.title', locale)}</label>
                                        <Controller
                                            control={control}
                                            name='payment'
                                            render={({field}) => (
                                                <RadioGroup
                                                    {...field}
                                                >
                                                    <FormControlLabel sx={{ mt: -1, mb: -1 }} value={translate('checkout.payment.card', locale)} control={<Radio color="primary" />} label={translate('checkout.payment.card', locale)} />
                                                    <FormControlLabel sx={{ mt: -1, mb: -1 }} value={translate('checkout.payment.cash', locale)} control={<Radio color="primary" />} label={translate('checkout.payment.cash', locale)} />
                                                    <FormControlLabel sx={{ mt: -1, mb: -1 }} value={translate('checkout.payment.cashless', locale)} control={<Radio color="primary" />} label={translate('checkout.payment.cashless', locale)} />
                                                </RadioGroup>
                                            )}
                                        />
                                    </FormControl>
                                </div>
                                {Cart.length > 0 &&<div className="checkout-grid-container">
                                    {Cart.map((item:ODetails)=>(
                                        <>
                                        <div key={item.id} className="checkout-grid-item checkout-grid-item-code">{item.code}</div>
                                        <div key={item.id} className="checkout-grid-item checkout-grid-item-name">{tt(item.name, locale)}</div>
                                        <div key={item.id} className="checkout-grid-item checkout-grid-item-amount">{item.amount}</div>
                                        <div key={item.id} className="checkout-grid-item checkout-grid-item-sum"><MoneyFormat {...{ value: item.sum, className: '', currency: true }} /></div>
                                        </>
                                    ))}
                                </div>}
                                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "-15px", width: "100%" }}>
                                    <div>
                                        <div style={{ width: "100%", maxWidth: "400px" }}>
                                            <button className="custom-button" disabled={!isValid}>{translate('checkout.confirm_order', locale)}</button>
                                        </div>
                                        <div className="error-row" style={{ marginTop: "-10px" }}>
                                            <p className="error-message" style={{ textAlign: "center" }}>{`${Error.length ? Error : ''}`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MainCheckout
