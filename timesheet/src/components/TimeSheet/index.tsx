import { Provider } from '../../context';
import ProjectForm from '../ProjectForm';
import { TimeSheetPage } from './TimeSheetPage';

const TimeSheet = () => {

    return (
        <Provider>
            <TimeSheetPage />
            <ProjectForm />
        </Provider>
    )
}

export default TimeSheet;