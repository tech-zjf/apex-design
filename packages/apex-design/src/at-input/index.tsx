import React, { useEffect, useRef, useState } from 'react';
import SelectUser from './select-user';
import './index.less';
import { StringTools } from 'tools';

let timer: NodeJS.Timeout | null = null;
export interface Event {
    target: {
        value: string;
    };
}

export interface Options {
    name: string;
    id: number | string;
    avatar?: string;
}

export interface Position {
    x: number;
    y: number;
}

export interface AtInputProps {
    value?: string;
    target?: string;
    height?: number;
    placement?: 'top' | 'bottom';
    onRequest: (keyword?: string) => Promise<Options[]>;
    onChange: (content: string, selectList: Options[] | []) => void;
    onBlur?: (content: string) => void;
    // todo
    placeholder?: string;
    atColor?: string;
    maxLength?: number;
    selectRow?: React.ReactNode;
}

export interface SelectComProps {
    visible: boolean;
    options: Options[];
    cursorPosition: Position;
    onSelect: (e: Options) => void;
}

const AtInput = (props: AtInputProps) => {
    const { height = 300, onRequest, onChange } = props;
    const [content, setContent] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const [options, setOptions] = useState<Options[]>([]);
    const [currentAtIdx, setCurrentAtIdx] = useState<number>();
    const [focusNode, setFocusNode] = useState<Node | string>();
    const [searchStr, setSearchStr] = useState<string>('');
    const [cursorPosition, setCursorPosition] = useState<Position>({
        x: 0,
        y: 0
    });
    const [selected, setSelected] = useState<Options[]>([]);
    const atRef = useRef<any>();

    /** 获取选择器弹框坐标 */
    const getCursorPosition = () => {
        const { x, y } = window.getSelection()?.getRangeAt(0).getBoundingClientRect() as any;
        const editorDom = window.document.querySelector('#atInput');
        const { x: eX, y: eY } = editorDom?.getBoundingClientRect() as any;
        setCursorPosition({ x: x - eX, y: y - eY });
    };

    /**获取用户下拉列表 */
    const fetchOptions = (key?: string) => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(async () => {
            const _options = await onRequest(key);
            setOptions(_options);
        }, 500);
    };

    useEffect(() => {
        fetchOptions();
    }, []);

    /**
     * 监听输入框
     */
    const onObserveInput = () => {
        let cursorBeforeStr = '';
        const selection: any = window.getSelection();
        if (selection?.focusNode?.data) {
            cursorBeforeStr = selection.focusNode?.data.slice(0, selection.focusOffset);
        }
        setFocusNode(selection.focusNode);
        const lastAtIndex = cursorBeforeStr?.lastIndexOf('@');
        setCurrentAtIdx(lastAtIndex);
        if (lastAtIndex !== -1) {
            getCursorPosition();
            const searchStr = cursorBeforeStr.slice(lastAtIndex + 1);
            // @之后可以输入空格以终止查询操作
            if (!StringTools.isIncludeSpacesOrLineBreak(searchStr)) {
                setSearchStr(searchStr);
                fetchOptions(searchStr);
                setVisible(true);
            } else {
                setVisible(false);
                setSearchStr('');
            }
        } else {
            setVisible(false);
        }
    };

    const selectAtSpanTag = (target: Node) => {
        window.getSelection()?.getRangeAt(0).selectNode(target);
    };

    const editorClick = async (e?: any) => {
        onObserveInput();
        // 判断当前标签名是否为span 是的话选中当做一个整体
        if (e.target.localName === 'span') {
            selectAtSpanTag(e.target);
        }
    };

    const editorChange = (event: any) => {
        const { innerText } = event.target;
        setContent(innerText);
        onObserveInput();
    };

    /**
     * @param id 唯一的id 可以uid
     * @param name 用户姓名
     * @param color 回显颜色
     * @returns
     */
    const createAtSpanTag = (id: number | string, name: string, color = 'blue') => {
        const ele = document.createElement('span');
        ele.className = 'at-span';
        ele.style.color = color;
        ele.id = id.toString();
        ele.contentEditable = 'false';
        ele.innerText = `@${name}`;
        return ele;
    };

    /**
     * 选择用户时回调
     */
    const onSelect = (item: Options) => {
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0) as Range;
        // 选中输入的 @关键字  -> @郑
        range.setStart(focusNode as Node, currentAtIdx!);
        range.setEnd(focusNode as Node, currentAtIdx! + 1 + searchStr.length);
        // 删除输入的 @关键字
        range.deleteContents();
        // 创建元素节点
        const atEle = createAtSpanTag(item.id, item.name);
        // 插入元素节点
        range.insertNode(atEle);
        // 光标移动到末尾
        range.collapse();
        // 缓存已选中的用户
        setSelected([...selected, item]);
        // 选择用户后重新计算content
        setContent(document.getElementById('atInput')?.innerText as string);
        // 关闭弹框
        setVisible(false);
        // 输入框聚焦
        atRef.current.focus();
    };

    /**
     * 过滤当前输入框中@ 的用户
     */
    const filterSelectUsers = () => {
        const spans = document.querySelectorAll('.at-span');
        let ids = new Set();
        spans.forEach((span) => ids.add(+span.id));
        return selected.filter((s) => ids.has(s.id));
    };

    /**  @的用户列表发生改变时，将最新值暴露给父组件 */
    useEffect(() => {
        const selectUsers = filterSelectUsers();
        onChange(content, selectUsers);
    }, [selected, content]);

    return (
        <div style={{ height, position: 'relative' }}>
            {/* 编辑器 */}
            <div id="atInput" ref={atRef} className={'editor'} contentEditable onInput={editorChange} onClick={editorClick} />
            {/* 选择用户框 */}
            <SelectUser options={options} visible={visible} cursorPosition={cursorPosition} onSelect={onSelect} />
        </div>
    );
};

export default AtInput;
