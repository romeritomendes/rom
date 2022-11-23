import { ISelectOptions } from "../../components/ProjectForm/Select";
import { Field } from "../../components/ProjectForm/Field";
import styled from "styled-components";

interface IFilterBar {
    filterTypes:    ISelectOptions[];
    filterType:     string;
    filterOptions:  ISelectOptions[];
    filterValue:    string;
    setFilterType:  (value: string) => void;
    setFilterValue: (value: string) => void;
}

export const FilterBar = (props: IFilterBar) => {
    const { filterTypes, filterType, filterOptions, filterValue, setFilterType, setFilterValue } = props;

    return (
        <Wrapper>
            <Field
                type="select"
                options={filterTypes}
                name="filterType"
                width={20}
                value={filterType}
                onChange={setFilterType}
            />

            <Field
                type="select"
                options={filterOptions}
                name="filterValue"
                width={20}
                value={filterValue}
                onChange={setFilterValue}
            />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display:            flex;
    justify-content:    space-between;
    margin:             0 2rem;

    width:              100ch;

    & > div {
        padding: 0;
        gap: 0;
    }
`;