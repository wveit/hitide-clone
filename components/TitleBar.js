import LoginControl from './LoginControl';

export function TitleBar({ onDrawerToggle }) {
    return (
        <div className='container'>
            <div className='fas fa-bars drawer-toggle' onClick={onDrawerToggle}></div>
            <h1>HiTIDE</h1>
            <div className='group first-group'>
                <div className='far fa-save drawer-toggle'></div>
                <div className='far fa-folder-open drawer-toggle'></div>
                <div className='fas fa-share-alt drawer-toggle'></div>
            </div>
            <div className='group'>
                <div className='fas fa-cog drawer-toggle'></div>
                <div className='far fa-question-circle drawer-toggle'></div>
            </div>
            <LoginControl />

            <style jsx>{`
                .container {
                    display: flex;
                    align-items: center;
                    padding: 0.3rem 0;
                    font-size: 1.2rem;
                    background-color: rgb(247, 247, 247);
                }

                .container > :global(*) {
                    margin: 0 1rem;
                }

                h1 {
                    font-size: inherit;
                    margin: 0;
                }

                .drawer-toggle {
                    cursor: pointer;
                }
                .drawer-toggle:hover {
                    color: rgb(116, 155, 206);
                }

                .group > :global(*) {
                    margin: 0.2rem;
                }

                .first-group {
                    margin-left: auto;
                }
            `}</style>
        </div>
    );
}
