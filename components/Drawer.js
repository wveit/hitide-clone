const defaultWidth = 600;

export function Drawer({ children, isOpen, width: propsWidth }) {
    let width = propsWidth || defaultWidth;

    return (
        <div className={'Drawer' + (isOpen ? ' open' : '')}>
            {children}

            <style jsx>{`
                .Drawer {
                    position: absolute;
                    top: 0;
                    right: -${width}px;
                    height: 100%;
                    width: ${width}px;
                    transition: right 0.3s;
                    background-color: white;
                }

                .Drawer.open {
                    right: 0;
                }
            `}</style>
        </div>
    );
}
