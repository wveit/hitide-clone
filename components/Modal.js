export function Modal({ show, children, onClickOutside }) {
    if (!show) return null;

    function handleOutsideClick(event) {
        if (event.target === event.currentTarget) {
            onClickOutside && onClickOutside();
        }
    }

    return (
        <div className='Modal' onClick={handleOutsideClick}>
            <div className='Modal__content'>{children}</div>

            <style jsx>{`
                .Modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 10;
                }

                .Modal__content {
                    background-color: white;
                    padding: 2rem;
                }
            `}</style>
        </div>
    );
}
