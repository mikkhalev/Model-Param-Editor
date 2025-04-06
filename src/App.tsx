import React, {FC} from 'react';
import './App.css';

interface Param {
    id: number;
    name: string;
    type: 'string';
}
interface ParamValue {
    paramId: number;
    value: string;
}
interface Model {
    paramValues: ParamValue[];
    colors: Color[];
}
interface Props {
    params: Param[];
    curModel: Model;
}
interface Color {
    color: string;
}

const ParamsEditor: FC<Props> = ({curModel, params}) => {

    const [model, setModel] = React.useState<Model>(curModel);

    function getModel(): void {
        alert(JSON.stringify(model));
    }

    function handleInput(value: string, id: number) {
        if (model.paramValues.find(elem => elem.paramId === id)) {
            if (value !== '') {
                setModel(prev => ({
                    ...prev,
                    paramValues: prev.paramValues.map(param =>
                        param.paramId === id ? { ...param, value } : param
                    )
                }));
            } else {
                setModel(prev => ({
                    ...prev,
                    paramValues: prev.paramValues.filter(p => p.paramId !== id)
                }));
            }
        } else {
            setModel(prev => ({
                ...prev,
                paramValues: [...prev.paramValues, {paramId: id, value: value}]
            }));
        }
    }

    return (
        <div className={'params-editor'}>
            {
                params.map((param) => (
                    <div className={'params-editor__item'} key={param.id}>
                        <span>
                            { param.name }
                        </span>
                        <input
                            type={'text'}
                            value={model.paramValues.find(elem => elem.paramId === param.id)?.value}
                            onChange={(e) => {handleInput(e.target.value, param.id)}}
                        />
                    </div>
                ))
            }
            <button
                onClick={() => {getModel()}}
            >
                getModel()
            </button>
        </div>
    );
};

function App() {
    let params: Param[] = [
        {id: 1, name: 'Назначение', type: 'string'},
        {id: 2, name: 'Длина', type: 'string'},
        {id: 3, name: 'Ширина', type: 'string'},
        {id: 4, name: 'Материал', type: 'string'},
    ]
    let Model: Model = {
        paramValues: [
            {paramId: 1, value: 'повседневное'},
            {paramId: 2, value: 'макс'}
        ],
        colors: []
    }
    return (
        <ParamsEditor
            curModel={Model}
            params={params}
        />
    );
}

export default App;
