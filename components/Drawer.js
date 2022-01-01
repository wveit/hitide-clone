// import { DrawerToggle } from './Drawer';

export function Drawer({ children, isOpen, onToggle, width = '600px' }) {
    const closedClass = isOpen ? '' : ' closed';
    return (
        <div className={'DrawerContainer' + closedClass}>
            <DrawerToggle onClick={onToggle} />
            <div className='DrawerContent'>{children}</div>
            <style jsx>{`
                .DrawerContainer {
                    position: relative;
                    height: 100%;
                    background-color: white;
                    overflow-x: hidden;
                    width: ${width};
                    transition: width 0.5s;
                }

                .DrawerContainer.closed {
                    width: 0px;
                }

                 {
                    /* .DrawerToggle {
                    position: absolute;
                    right: 5px;
                    top: 5px;
                    width: 10px;
                    height: 10px;
                    background-color: red;
                } */
                }

                .DrawerContent {
                    position: relative;
                    height: 100%;
                    z-index: 100;
                    width: ${width};
                }
            `}</style>
        </div>
    );
}

function DrawerToggle({ onClick }) {
    return (
        <div className='fas fa-bars' onClick={onClick}>
            <style jsx>{`
                div {
                    position: absolute;
                    top: 0.5rem;
                    right: 0.5rem;
                    cursor: pointer;
                    font-size: 1.3rem;
                }
                div:hover {
                    color: rgb(116, 155, 206);
                }
            `}</style>
        </div>
    );
}
