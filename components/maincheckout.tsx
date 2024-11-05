import { useRouter } from "next/router"
import { translate } from "../locales/translate"
import { GetCartAction, RemoveItem, useAppDispatch, useAppSelector } from "../redux"
import axios from "axios"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import InputMask from "react-input-mask"
import { ChangeEvent, useEffect, useState } from "react"
import MoneyFormat from "./money-format"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Radio from "@mui/material/Radio"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
    

interface Details {
    fio: string,
    phone: string | undefined,
    city: string,
    shipping: {
        company: string,
        dep_index: string
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
    const posts: string[] = ['Нова пошта', 'Укрпошта']

    const checkoutSchema = yup.object().shape({
        fio: yup.string().trim()
           .required(translate('checkout.messages.required', locale)),
        phone: yup.string()
           .matches(/^\+38\s[0-9,\s]+$/, translate('checkout.messages.required', locale))
           .matches(/^\+38\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/, translate('checkout.messages.phone', locale)),
        city: yup.string().trim()
           .required(translate('checkout.messages.required', locale)),
        shipping: yup.string()
            .required(translate('checkout.messages.required', locale))
            .oneOf(posts, translate('checkout.messages.shipping', locale)),
     });
  
    const { register, formState: { errors, isValid }, clearErrors, getValues, setValue } = useForm({
        mode: "onChange",
        resolver: yupResolver(checkoutSchema)
     });
       
    if (!cart.started) {
        dispatch(GetCartAction(cart))
    }

    useEffect(() => {
        if (cart.started) setCart(getDataFromCart())
    }, [cart.started])
    
    useEffect(() => {
        setValue('shipping', Shipping)
    }, [Shipping])
  
    const getDetails = (): Details => {
        const res: Details = {
            fio: getValues('fio'),
            phone: getValues('phone'),
            city: getValues('city'),
            shipping: {
                company: getValues('shipping'),
                dep_index: DepIndex
            }
        }
        return res
    }

    const getDataFromCart = (): ODetails[] => {
        let items: ODetails[] = []
        cart.cart.forEach((item:any)=>{
            items.push({ id: item.id, code: item.code, name: item.name, amount: item.iamount,
                sum: item.iamount>=item.dcount? item.iamount*item.price-(item.iamount*item.price*item.dpercent)/100 : item.iamount*item.price,
                discount: item.iamount>=item.dcount?item.dpercent:0, firmid: item.firm.id
            })
        })
        return items
    }
  
    const postOrder = (order:Order):any => {
        let res: Order = { details: '',  odetails: [] }
        axios.post('order', order).then(({data}) => res = data)
        return res
    }

    const clearCart = (items:ODetails[]) => (items.forEach((item:ODetails) => dispatch(RemoveItem(item.id))))

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Cart.length > 0) {
            const data:Order = postOrder({ details: JSON.stringify(getDetails()), odetails: Cart})
            // clearCart(Cart)
        }
    }

    const onChangeShippingHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setShipping(e.target.value)
        clearErrors('shipping')
        setDepIndex('')
    }

    const onChangeDepIndex = (e: ChangeEvent<HTMLInputElement>) => {
        setDepIndex(e.target.value)
    }

    return (
        <main>
            <div className="container-simple">
                <div className="main-simple">
                    <div className="dialog-body checkout">
                        <h2>{translate('checkout.title', locale)}</h2>
                        <form className="dialog-form" onSubmit={handleSubmit}>
                            <div className="checkout_frame">
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
                                    <InputMask
                                        {...register("phone")}
                                        id="phone"
                                        className={`checkout-input${errors.phone ? ' error-color' : ''} phone`}
                                        mask="+38 999 999 99 99"
                                        maskPlaceholder=''
                                        alwaysShowMask={true}
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
                                        // placeholder={translate('checkout.city_ph', locale)}
                                        type="text"
                                        maxLength={80}
                                    />
                                    <div className="error-row">
                                        <p className="error-message">{`${errors.city ? errors.city.message : ''}`}</p>
                                    </div>
                                </div>
                                <FormControl className="form-row">
                                    <label className="form-label">{translate('checkout.shipping.title', locale)}</label>
                                    <RadioGroup
                                        value={Shipping}
                                        onChange={onChangeShippingHandler}
                                    >
                                        <FormControlLabel sx={{ mt: -1, mb: -1 }} value={posts[0]} control={<Radio color="primary" />} label={translate('checkout.shipping.new_post.title', locale)} />
                                        <FormControlLabel sx={{ mt: -1, mb: -1 }} value={posts[1]} control={<Radio color="primary" />} label={translate('checkout.shipping.ukr_post.title', locale)} />
                                    </RadioGroup>
                                    {Shipping.length > 0 &&<input
                                        className="checkout-input checkout-input-dep-index"
                                        placeholder={Shipping.includes(posts[0])?translate('checkout.shipping.new_post.dep', locale):Shipping.includes(posts[1])?translate('checkout.shipping.ukr_post.index', locale):''}
                                        maxLength={Shipping.includes(posts[0])?40:Shipping.includes(posts[1])?5:0}
                                        type="text"
                                        value={DepIndex}
                                        onChange={onChangeDepIndex}
                                    />}
                                </FormControl>
                                <div>
                                    {Cart.map((item:ODetails)=>(
                                        <div key={item.id}>код: {item.code} товар: {item.name} кількість: {item.amount} скидка: {item.discount} сумма: <MoneyFormat {...{ value: item.sum, className: 'price-value', currency: false }} /></div>
                                    ))}
                                </div>
                                <div style={{ float: "right", paddingRight: "20px" }}>
                                    <div style={{ maxWidth: "400px" }}>
                                        <button className="custom-button">{translate('checkout.confirm_order', locale)}</button>
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
