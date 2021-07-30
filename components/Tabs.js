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
            <div className='TabContent'>{children[selectedTab]}</div>

            <style jsx>{`
                .TabContainer {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }

                .TabButtonRow {
                    display: flex;
                    align-items: center;
                    background-color: rgb(247, 247, 247);
                }

                .TabButton {
                    border-bottom: 2px solid lightgray;
                    cursor: pointer;
                    flex: 1 1 0px;
                    text-align: center;
                    padding: 0.5rem;
                }

                .TabButton.selected {
                    border-bottom: 2px solid rgb(172, 31, 43);
                }

                .TabContent {
                    min-height: 0; /* for some reason needed to keep TabContent from overflowing */
                }
            `}</style>
        </div>
    );
}
