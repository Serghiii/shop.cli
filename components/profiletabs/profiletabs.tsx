import React, { useState } from "react";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import { PasswordPanel, PhotoPanel, ProfilePanel } from "./index";

const ProfileTabs: React.FC<any> = props => {
   const [value, setValue] = useState(0);

   interface TabPanelProps {
      children?: React.ReactNode;
      index: any;
      value: any;
   }

   function TabPanel(props: TabPanelProps) {
      const { children, value, index, ...other } = props;

      return (
         <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
         >
            {value === index && (
               <div>
                  {children}
               </div>
            )}
         </div>
      );
   }

   function a11yProps(index: any) {
      return {
         id: `scrollable-auto-tab-${index}`,
         'aria-controls': `scrollable-auto-tabpanel-${index}`,
      };
   }

   const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
   };

   return (
      <>
         <AppBar position="static">
            <Tabs
               value={value}
               onChange={handleChange}
               indicatorColor="primary"
               textColor="primary"
               variant="scrollable"
               scrollButtons="auto"
            >
               <Tab label="Профіль" {...a11yProps(0)} />
               <Tab label="Зміна паролю" {...a11yProps(1)} />
               <Tab label="Фото" {...a11yProps(2)} />
            </Tabs>
         </AppBar>
         <TabPanel value={value} index={0}>
            <ProfilePanel {...props} />
         </TabPanel>
         <TabPanel value={value} index={1}>
            <PasswordPanel />
         </TabPanel>
         <TabPanel value={value} index={2}>
            <PhotoPanel {...props} />
         </TabPanel>
      </>
   )
}

export default ProfileTabs