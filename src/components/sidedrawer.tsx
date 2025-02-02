import cn from 'clsx'
import { useDictionary } from '../contexts'
import { Language, Logo } from './index'

const SideDrawer: React.FC<any> = props => {
	const { d } = useDictionary()
	return (
		<div className={cn('side-drawer', { show: props.show })}>
			<div className='side-drawer-header'>
				<Logo />
				<Language mobile={props.show} />
				<div className='side-drawer-registration'>
					<i className='side-drawer-registration__icon'></i>
					<span className='side-drawer-registration__login'>{d.auth.login.title}</span>
					<span className='side-drawer-registration__register'>{d.auth.register.title}</span>
				</div>
			</div>
			<div className='side-drawer-main'></div>
		</div>
	)
}

export default SideDrawer
