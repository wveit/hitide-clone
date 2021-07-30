import { useState } from 'react';

export function Tabs({ tabs, children }) {
    const [selectedTab, setSelectedTab] = useState(0);
    return (
        <div className='TabContainer'>
            <div className='TabButtonRow'>
                {tabs.map((tab, index) => (
                    <div
                        key={tab}
                        onClick={() => setSelectedTab(index)}
                        className={'TabButton' + (selectedTab === index ? ' selected' : '')}
                    >
                        {tab}
                    </div>
                ))}
            </div>
            <div className='TabContent>'>{children[selectedTab]}</div>

            <style jsx>{`
                .TabButtonRow {
                    display: flex;
                    align-items: center;
                    background-color: white;
                }

                .TabButton {
                    border-bottom: 2px solid rgba(0, 0, 0, 0);
                    cursor: pointer;
                    flex: 1 1 0px;
                    text-align: center;
                    padding: 0.5rem;
                }

                .TabButton.selected {
                    border-bottom: 2px solid rgb(172, 31, 43);
                }
            `}</style>
        </div>
    );
}
