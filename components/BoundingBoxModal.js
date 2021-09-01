import { useEffect, useState } from 'react';
import { Modal } from './Modal';

export function BoundingBoxModal({ show, bbox, onNewBbox, onReset, onClose }) {
    const [box, setBox] = useState({ west: bbox[0], south: bbox[1], east: bbox[2], north: bbox[3] });

    useEffect(() => {
        setBox({ west: bbox[0], south: bbox[1], east: bbox[2], north: bbox[3] });
    }, [bbox]);

    function handleChange(event) {
        let newValue;
        if (event.target.value === '-') {
            newValue = '-';
        } else if (isNaN(Number(event.target.value))) {
            return;
        } else {
            newValue = event.target.value;
        }

        setBox({ ...box, [event.target.name]: newValue });
    }

    function handleUpdate() {
        const newBbox = Object.values(box).map((value) => {
            let newValue = Number(value);
            return isNaN(newValue) ? 0 : newValue;
        });

        onNewBbox && onNewBbox(newBbox);
    }

    return (
        <Modal show={show} onClickOutside={onClose}>
            <h3>Select Bounding Box</h3>
            <div>
                <input name='west' value={box.west} onChange={handleChange} />
                <input name='south' value={box.south} onChange={handleChange} />
                <input name='east' value={box.east} onChange={handleChange} />
                <input name='north' value={box.north} onChange={handleChange} />
                <button onClick={handleUpdate}>Update</button>
                <button onClick={onReset}>Reset</button>
            </div>
        </Modal>
    );
}
