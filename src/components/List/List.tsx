import React from 'react';
import {useInfiniteQuery} from "react-query";
import {getUsers} from "src/components/List/api";
import {useVirtualizer} from "@tanstack/react-virtual";

export const fetchSize = 1000;
const h = Math.min(700, window.innerHeight);

async function fetchData(offset, limit) {
    // await new Promise(resolve => setTimeout(resolve, 1000))
    return getUsers(limit);
}

const List = ({onSelect, selected}) => {
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

    const parentRef = React.useRef()

    const rowVirtualizer = useVirtualizer({
        count: items.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 35,
        onChange: (d) => {
            if (d.scrollElement.scrollHeight - h - 100 < d.scrollElement.scrollTop && !isFetching) {
                fetchNextPage();
            }
        }
    })
    return (
        <div style={{
            width: '50%'
        }}>
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
                            onClick={() => onSelect(items[it.index], it.index)} style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: `${it.size}px`,
                            transform: `translateY(${it.start}px)`,
                        }}>
                            {it.index} {items[it.index].name} {items[it.index].surname}
                        </div>
                    )}
                </div>
            </div>
            {isFetching && "Загрузка..."}
        </div>
    )
};

export default List;