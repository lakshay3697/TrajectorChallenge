import axios from 'axios';
import { useState } from 'react';
import { FetchAppState, APIData } from '../types';

export function useFetchPosts()
{
    const [fetchAppState, setFetchAppState] = useState(FetchAppState.DEFAULT);
    const [data, setAPIData] = useState<Array<APIData>>([]);

    const fetchData = async () => {
        try{
            
            setFetchAppState(FetchAppState.LOADING);

            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            const responseData = response.data as Array<APIData>;

            setAPIData(responseData);
            setFetchAppState(FetchAppState.SUCCESS);

        } catch(err){

            setFetchAppState(FetchAppState.ERROR);
        }
    }

    return [data, fetchAppState, fetchData] as const;
}