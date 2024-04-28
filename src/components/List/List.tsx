import React from 'react';
import {useInfiniteQuery} from "react-query";
import {getUsers} from "src/components/List/api";
import {useVirtualizer} from "@tanstack/react-virtual";
import {Avatar, Button} from "@mui/material";
import {useSelector} from "react-redux";

const h = Math.min(700, window.innerHeight);

async function fetchData(offset, limit) {
    console.log(limit)
    return getUsers(limit);
}

const List = ({onSelect, selected}) => {
    const fetchSize = useSelector(state => state.app.fetchSize);

    const {data, fetchNextPage, isFetching, isLoading} = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: ({pageParam = 0}) => fetchData((pageParam) * fetchSize, fetchSize),
        initialPageParam: 0,
        getNextPageParam: (lastGroup, groups) => groups.length,
        refetchOnWindowFocus: false,
    })
    const items = React.useMemo(
        () => data?.pages?.flatMap(page => page) ?? [],
        [data]
    )
    console.log(items.length)
    const parentRef = React.useRef();

    const rowVirtualizer = useVirtualizer({
        count: items.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 30,
    })
    return (
        <div>
            <div ref={parentRef}
                 style={{
                     height: h + 'px',
                     overflow: 'auto',
                 }}>
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map(it =>
                        <div
                            className={'item ' + (selected && selected.userId === items[it.index].userId ? 'selected' : '')}
                            key={it.key}
                            onClick={() => onSelect(items[it.index], Math.floor(it.index / fetchSize))} style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: `${it.size}px`,
                            transform: `translateY(${it.start}px)`,
                        }}>
                            <div className={'flex justify-between mr-4'}><p>{it.index} {items[it.index].name} {items[it.index].surname}</p><Avatar
                                sx={{width:30, height:30}} src={items[it.index].avatar}></Avatar></div>
                        </div>
                    )}
                </div>
            </div>
            <Button onClick={fetchNextPage}>Загрузить больше</Button>
            {isFetching && "Загрузка..."}
        </div>
    )
};

export default List;