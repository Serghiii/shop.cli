'use client'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import React, { ChangeEvent, useCallback, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { useAuthContext, useDictionary } from '../../../contexts'
import { Resize, resize } from '../../../lib/utils'

const PhotoPanel: React.FC<any> = props => {
	const [state, setState] = useState<any>({
		editor: null,
		scale: 1
	})
	const [editor, setEditor] = useState(true)
	const { d } = useDictionary()
	const [file, setFile] = useState(d.profile.tabs.panels.selectfile)
	const { patch } = useAuthContext()

	const profilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || !e.target.files[0]) return
		const { type } = e.target.files[0]
		if (type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg')) {
			setState({ ...state, scale: 1, openCropper: true, Image: e.target.files[0], fileUploadErrors: [] })
			setEditor(!editor)
			setFile(e.target.files[0].name)
		}
	}

	const onScaleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const scale = parseFloat(e.target.value)
		setState({ ...state, scale })
	}

	const setEditorRef = useCallback(
		(editor: any) => {
			setState({ ...state, editor })
		},
		// eslint-disable-next-line
		[editor]
	)

	const onSubmitHandler = async (e: any) => {
		e.preventDefault()
		const editor: any = state.editor
		if (editor?.props.image !== undefined) {
			const Avatar = {
				avatar: await editor
					?.getImageScaledToCanvas()
					.toDataURL()
					.replace(/^data:image\/\w+;base64,/, '')
			}
			if (Avatar.avatar) {
				let compressedImage = Avatar.avatar
				try {
					compressedImage = await resize(Avatar.avatar, Resize.Auto, Resize.Auto, 20)
				} catch {}
				patch('user/changeavatar', { avatar: compressedImage }).then(() => {
					window.location.reload()
				})
			}
		}
	}

	return (
		<>
			<form className='dialog-form-simple' onSubmit={onSubmitHandler}>
				<div style={{ display: 'flex', flexDirection: 'column', width: '220px' }}>
					<div>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<AvatarEditor
								image={state.Image}
								ref={setEditorRef}
								border={1}
								color={[192, 192, 192, 1]}
								style={{ width: '150px', height: '150px', borderRadius: '50%' }}
								scale={state.scale}
								borderRadius={100}
								rotate={0}
							/>
						</div>
						<input
							style={{ width: '100%', marginTop: '8px', marginBottom: '20px' }}
							type='range'
							value={state.scale}
							name='points'
							min='1'
							max='10'
							step='0.1'
							onChange={onScaleChange}
						/>
					</div>
					<div className='file-box'>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<label htmlFor='file' className='btn'>
								<div className='file-icon'>
									<FileDownloadIcon color='action' />
								</div>
							</label>
							<div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
								<label className='file-name' title={file}>
									{file}
								</label>
							</div>
						</div>
						<input
							style={{ display: 'none' }}
							id='file'
							type='file'
							name='profilePicBtn'
							accept='image/png, image/jpeg'
							onChange={profilePicChange}
						/>
					</div>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<button className='custom-button-simple' disabled={false}>
							{d.profile.tabs.panels.save}
						</button>
					</div>
				</div>
				<style jsx>
					{`
						.btn {
							cursor: pointer;
						}
						.file-box {
							display: inline-block;
							height: auto;
							width: 100%;
							padding: 5px;
							margin-bottom: 20px;
							box-sizing: border-box;
						}
						.file-name {
							word-wrap: break-word;
						}
						.file-icon {
							width: 23px;
							height: 23px;
							margin-right: 5px;
							opacity: 50%;
						}
					`}
				</style>
			</form>
		</>
	)
}

export default PhotoPanel
