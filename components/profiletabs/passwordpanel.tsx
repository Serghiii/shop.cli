import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const PasswordPanel: React.FC = () => {

   const validationSchema = yup.object().shape({
      password: yup.string().required("Поле має бути заповнено")
         .min(6, "Пароль повинен бути не менше 6 символів"),
      cpassword: yup.string().required("Поле має бути заповнено")
         .min(6, "Пароль повинен бути не менше 6 символів")
         .oneOf([yup.ref('password'), null], 'Пароль повинен співпадати')
   })

   const { register, handleSubmit, formState: { errors }, getValues } = useForm({
      resolver: yupResolver(validationSchema)
   });

   const onSubmit = () => {
      axios.post('user/changepassword', { password: getValues('password') }).then(() => {
         window.location.reload();
      })
   }

   return (
      <form className="dialog-form-simple" onSubmit={handleSubmit(onSubmit)}>
         <div className="form-row-simple">
            <label htmlFor="Password" className="form-label-simple">Новий пароль</label>
            <input {...register("password")} id="Password" className="custom-input-simple" name="password" type="password" maxLength={500} />
         </div>
         <div className="form-row-simple" style={{ height: "11px", margin: "-14px 0 0 0" }}>
            <div className="form-label-simple hidden-div"></div>
            <div className="invalid-feedback">{errors.password?.message}</div>
         </div>
         <div className="form-row-simple">
            <label htmlFor="confirmPassword" className="form-label-simple">Повторіть пароль</label>
            <input {...register("cpassword")} id="confirmPassword" className="custom-input-simple" name="cpassword" type="password" maxLength={500} />
         </div>
         <div className="form-row-simple" style={{ height: "11px", margin: "-14px 0 0 0" }}>
            <div className="form-label-simple hidden-div"></div>
            <div className="invalid-feedback">{errors.cpassword?.message}</div>
         </div>
         <div className="form-row-simple">
            <div className="form-label-simple"></div>
            <div style={{ display: 'inlineBlock' }}>
               <button className="custom-button-simple" disabled={false}>Зберегти</button>
            </div>
         </div>
      </form>
   )
}
export default PasswordPanel