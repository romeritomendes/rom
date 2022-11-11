import { useState } from "react";
import axios from 'axios';
import { BASE_URL } from ".";

export interface IuseApi {
    endpoint:   string;
    _id?:       string;
    params?:    string;
}

export function useApi<T = unknown>({ endpoint, _id, params }: IuseApi) {
    const [data, setData] = useState<T | null>(null);
    const [isFetching, setIsFetching] = useState(true);
    const [actionData, setActionData] = useState(null);
    const [isActing, setIsActing] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const BASE_ENDPOINT = `${BASE_URL}${endpoint}`;

    const getAPI = () => {

        setIsFetching(true);
        setError(null);

        let url = `${BASE_ENDPOINT}`;

        if(params)
            url = `${url}${params}`;
        
        axios.get(url)
            .then(res => {
                setData(res.data.rows.map(
                    (row: any) => {
                        const category = [];
                        if(row.category)
                            category.push(...row.category);
                        
                        if(row.type)
                            category.push(row.type);

                        return (
                            {
                                ...row,
                                category,
                            }
                        )
                    }
                ));
            })
            .catch(
                err => setError(err)
            )
            .finally(
                () => setIsFetching(false)
            );
    }

    const getOneAPI = () => {

        setIsFetching(true);
        setError(null);

        let url = `${BASE_ENDPOINT}`;

        if(_id)
            url = `${url}/${_id}`;

        if(params)
            url = `${url}/${params}`;

        axios.get(url)
            .then(res => {
                return setData(res.data.rows[0]);
            })
            .catch(
                err => setError(err)
            )
            .finally(
                () => setIsFetching(false)
            );
    }

    const postAPI = (payload: {}) => {

        setIsActing(true);
        setError(null);

        let url = `${BASE_ENDPOINT}`;

        axios.post(url, payload)
            .then(res => {
                setActionData(res.data.rows);
            })
            .catch(
                err => setError(err)
            )
            .finally(
                () => setIsActing(false)
            );
    }

    const putAPI = (payload: {}) => {

        setIsActing(true);
        setError(null);

        let url = `${BASE_ENDPOINT}/${_id}`;

        axios.put(url, payload)
            .then(res => {
                setActionData(res.data.rows);
            })
            .catch(
                err => setError(err)
            )
            .finally(
                () => setIsActing(false)
            );
    }

    const delAPI = () => {

        setIsActing(true);
        setError(null);

        let url = `${BASE_ENDPOINT}/${_id}`;

        axios.delete(url)
            .then(res => {
                setActionData(res.data.rows);
            })
            .catch(
                err => setError(err)
            )
            .finally(
                () => setIsActing(false)
            );
    }
    
    return {
        data,
        isFetching,
        actionData,
        isActing,
        error,
        getAPI,
        getOneAPI,
        postAPI,
        putAPI,
        delAPI
    }
}