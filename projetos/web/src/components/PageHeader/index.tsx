import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface PageHeaderProps {
    title: string;
    description?: string;
} /** para definir a propriedade, qnado colcoa a ? é não obrigatorio */

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar" />
                </Link>
                <img src={logoImg} alt="Proffy" />
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                {props.description && <p>{props.description}</p>}

                
                {props.children}
            </div>


        </header>
    );
}

/** aki tem q usar  funcao anonima assim com FC (fuction component) pra poder ter uma propriedade no caso a title */
/** isso é coisa do typescrypt */
/** o children é uam propriedade automaticca */

export default PageHeader;