import React from 'react'
import { APIData } from '../types'
interface APIDataItemProps {
    data: Array<APIData>;
}
const APIDataItem : React.FC<APIDataItemProps>= ({data}) => {
  return (
    <>
        <p>Here's the sample data from API :-</p>
        <ul className="items-list">
        {data.map((ele: APIData) => (
            <li key={ele.id} className="item">
            <h3>
                {ele.id} / {ele.title}
            </h3>
            <p>{ele.body}</p>
            </li>
        ))}
        </ul>
    </>
  )
}

export default APIDataItem