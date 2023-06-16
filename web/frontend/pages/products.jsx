import { Card, Page, Layout, TextContainer, Text, Pagination } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useAuthenticatedFetch } from "../hooks";
import { useEffect, useState } from "react";
export default function SyncProduct() {
    let i=0;
    const [ data, setData ] = useState({});
    const [ status, setStatus ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const [ dataLoading, setDataLoading ] = useState(true);
    const fetch = useAuthenticatedFetch();
    useEffect(()=>{
        fetch('/api/products').then((res)=>{
            return res.json();
        }).then((data)=>{
            setData(data);
            setDataLoading(false);
        }) 
        fetch('/api/syncstatus').then((res)=>{
            return res.json();
        }).then((data)=>{
            setStatus(data);
            setLoading(false);
        })
    },[])
    function Pagination(e){
        if(!dataLoading){
            setDataLoading(true);
            let target = e.target;
            let page = target.getAttribute('page');
            let type = target.getAttribute('type');
            fetch('/api/products?page='+page+'&type='+type).then((res)=>{
                return res.json();
            }).then((data)=>{
                setData(data);
                setDataLoading(false);
            })
        }
    }
    return (
        <Page>
            {loading?
                <div className="fixed w-full h-full flex justify-center items-center top-0 left-0">
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>:
                <div className="container">
                    <div className="product flex-1">
                        <div className="productsales relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Title
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Sku
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Created
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Updated
                                        </th>
                                        {/* <th scope="col" className="px-6 py-3">
                                            Action
                                        </th> */}
                                    </tr>
                                </thead>  
                                <tbody>
                                    {dataLoading?
                                        <tr>
                                            <td colSpan={5}>
                                                <div className="relative w-full h-full" style={{height:'100px'}}>
                                                    <div className="absolute w-full h-full flex justify-center items-center top-0 left-0">
                                                        <div role="status">
                                                            <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                            </svg>
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    :
                                        data.status && data.allpages != 0? data.data.map((product)=>{
                                            return(
                                                <tr key={product.sku} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {product.title}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {product.sku}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {product.status}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {product.created_status?"Created":"Not Created"}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {product.updated_status?"Updated":product.created_status?"Syncing":"Not Created"}
                                                    </td>
                                                </tr> 
                                            )
                                        }):<tr><td colSpan={5}><h2 className="text-center pb-3 pt-3">No record found</h2></td></tr>
                                    }
                                </tbody> 
                            </table>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center m-3">
                    {data.status&&data.allpages>1&&data.page!==1?
                        <a onClick={Pagination} type="prev" page={data.page} className="inline-flex cursor-pointer items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg aria-hidden="true" type="prev" page={data.page} className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                            Previous
                        </a>
                    :""}
                    {data.status&&data.allpages>1&&data.page!==data.allpages?    
                        <a onClick={Pagination} type="next" page={data.page} className="inline-flex cursor-pointer items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Next
                            <svg aria-hidden="true" type="next" page={data.page} className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </a>
                    :""}
                    </div>
                </div>
            }
        </Page>
    )
}