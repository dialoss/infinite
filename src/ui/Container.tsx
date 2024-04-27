import React from 'react';

const Container = ({children}: {children: React.ReactElement}) => {
    return (
        <div className={'max-w-6xl mx-auto'}>
            {children}
        </div>
    );
};

export default Container;