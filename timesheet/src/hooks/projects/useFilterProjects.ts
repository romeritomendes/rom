import { useEffect, useState } from "react";
import { ISelectOptions } from "../../components/ProjectForm/Select";
import { IProject } from "../../enities/project";
import { FilterBar } from "./Filter";

interface IuseFilterTabArr {
    tabArr:       any[];
    typesOfFilters: ISelectOptions[],
}

export function useFilterTabArr<T = any>(props: IuseFilterTabArr) {
    const { tabArr, typesOfFilters } = props;

    const [filterType, setFilterType] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [filterOptions, setFilterOptions] = useState<ISelectOptions[]>([]);


    const tabArrUnique = [...new Map(tabArr.map(item => [item[filterType], item])).values()];

    useEffect(() => {
        const options: ISelectOptions[] = [
            {
                label: 'Todos',
                value: ''
            }
        ];

        if(filterType !== '')
            tabArrUnique.forEach(
                (row: any) => {
                    options.push(
                        {
                            label: row[filterType.replace('Id', 'Name')],
                            value: row[filterType],
                        }
                    )
                }
            );

        setFilterOptions(options);
        setFilterValue("");
    }, [filterType]);

    const tabArrFiltrados = filterValue === '' ? tabArr : tabArr.filter(row => row[filterType] === filterValue);

    return {
        FilterBar: () => FilterBar(
            {
                filterOptions,
                filterType,
                filterTypes: typesOfFilters,
                filterValue,
                setFilterType,
                setFilterValue,
            }
        ),
        filteredProjects: tabArrFiltrados
    }
}