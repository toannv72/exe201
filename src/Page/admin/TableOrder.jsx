
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import React, { useState } from "react";
import OrderPending from './ComOrderTable/OrderPending';
import OrderProcessing from './ComOrderTable/OrderProcessing';
import OrderShipped from './ComOrderTable/OrderShipped';
import OrderDelivered from './ComOrderTable/OrderDelivered';
import OrderCanceled from './ComOrderTable/OrderCanceled';
import OrderReturned from './ComOrderTable/OrderReturned';
import OrderAll from './ComOrderTable/OrderAll';
import { textApp } from "../../TextContent/textApp";
import ComHeaderStaff from "../Components/ComHeaderStaff/ComHeaderStaff";
const data = [
    {
        label: textApp.OrderHistory.label.status,
        value: textApp.OrderHistory.value.status,
        desc: <OrderPending  />,
    },
    {
        label: textApp.OrderHistory.label.status1,
        value: textApp.OrderHistory.value.status1,
        desc: <OrderProcessing />,
    },

    {
        label: textApp.OrderHistory.label.status2,
        value: textApp.OrderHistory.value.status2,
        desc: <OrderShipped />,
    },

    {
        label: textApp.OrderHistory.label.status3,
        value: textApp.OrderHistory.value.status3,
        desc: <OrderDelivered />,
    },

    {
        label: textApp.OrderHistory.label.status4,
        value: textApp.OrderHistory.value.status4,
        desc: <OrderCanceled />,
    },
    {
        label: textApp.OrderHistory.label.status5,
        value: textApp.OrderHistory.value.status5,
        desc: <OrderReturned />,
    },
    {
        label: textApp.OrderHistory.label.status6,
        value: textApp.OrderHistory.value.status6,
        desc: <OrderAll />,
    },
];
export default function TableOrder() {
    const [activeTab, setActiveTab] = useState(data[0].value);
    
    return (
        <>
            <ComHeaderStaff/>
            <Tabs value={activeTab}>
                <TabsHeader
                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                    indicatorProps={{
                        className:
                            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                    }}
                >
                    {data.map(({ label, value }) => (
                        <Tab
                            key={value}
                            value={value}
                            onClick={() => setActiveTab(value)}
                            className={activeTab === value ? "text-gray-900 z-0" : "cursor-pointer"}
                        >
                            {label}
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody>
                    {data.map(({ value, desc }) => (
                        <TabPanel key={value} value={value} className='py-2'> 
                        {React.cloneElement(desc, { activeTab })}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>

        </>
    )
}
