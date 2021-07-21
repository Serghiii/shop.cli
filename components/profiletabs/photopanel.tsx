import axios from "axios";
import React, { ChangeEvent, useCallback, useState } from "react";
import AvatarEditor from "react-avatar-editor";

const PhotoPanel: React.FC<any> = (props) => {
   const [state, setState] = useState<any>({
      editor: null,
      scale: 1,
   });
   const [editor, setEditor] = useState(true);

   const profilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || !e.target.files[0]) return;
      const { type } = e.target.files[0];
      if ((type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg'))) {
         setState({ ...state, scale: 1, openCropper: true, Image: e.target.files[0], fileUploadErrors: [] });
         setEditor(!editor);
      }
   };

   const onScaleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const scale = parseFloat(e.target.value);
      setState({ ...state, scale });
   };

   const setEditorRef = useCallback((editor) => {
      setState({ ...state, editor });
      // eslint-disable-next-line
   }, [editor]);

   const SaveProfileSubmit = (e: any) => {
      e.preventDefault();
      const editor: any = state.editor;
      if (editor) {
         const Avatar = {
            avatar: editor?.getImageScaledToCanvas().toDataURL().replace(/^data:image\/\w+;base64,/, "")
         }
         if (Avatar.avatar) {
            axios.post('user/changeavatar', Avatar).then((res) => {
               window.location.reload();
            })
         }
      }
   }

   return (
      <>
         <form className="dialog-form-simple" onSubmit={SaveProfileSubmit}>
            <div style={{ display: "flex", flexDirection: "column", width: "220px" }}>
               <div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
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
                  <input style={{ width: '100%', marginTop: "8px", marginBottom: "20px" }} type="range" value={state.scale} name="points" min="1" max="10" step="0.1" onChange={onScaleChange} />
               </div>
               <input style={{ marginBottom: "20px" }} type="file" name="profilePicBtn" accept="image/png, image/jpeg" onChange={profilePicChange} />
               <div style={{ display: "flex", justifyContent: "center" }}>
                  <button className="custom-button-simple" disabled={false}>Зберегти</button>
               </div>
            </div>
         </form>
      </>
   )

}
export default PhotoPanel