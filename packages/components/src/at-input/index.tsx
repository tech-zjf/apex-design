import React, { useEffect, useRef, useState, useCallback } from 'react';
import SelectUser from './select-user';
import './index.less';
import { StringTools } from '../../tools/index';

// 用于防抖的定时器
let debounceTimer: NodeJS.Timeout | null = null;

/**
 * 自定义事件接口，用于模拟输入事件的目标属性
 */
export interface Event {
    target: {
        value: string;
    };
}

/**
 * 用户选项接口，定义用户的基本信息
 */
export interface UserOption {
    name: string;
    id: number;
    avatar?: string;
}

/**
 * 光标位置接口，定义光标在页面中的坐标
 */
export interface CursorPosition {
    x: number;
    y: number;
}

/**
 * AtInput 组件的属性接口
 */
export interface AtInputProps {
    value?: string;
    target?: string;
    height?: number;
    placement?: 'top' | 'bottom';
    // 用于请求用户选项的回调函数，接收关键字并返回一个包含用户选项的 Promise
    onRequest: (keyword?: string) => Promise<UserOption[]>;
    // 内容变化时的回调函数，接收当前内容和选中的用户列表
    onChange: (content: string, selectedUsers: UserOption[] | []) => void;
    // 失去焦点时的回调函数，接收当前内容
    onBlur?: (content: string) => void;
    placeholder?: string;
    atColor?: string;
    maxLength?: number;
    selectRow?: React.ReactNode;
}

/**
 * SelectUser 组件的属性接口
 */
export interface SelectUserProps {
    visible: boolean;
    options: UserOption[];
    cursorPosition: CursorPosition;
    // 用户选择时的回调函数，接收选中的用户选项
    onSelect: (user: UserOption) => void;
}

/**
 * AtInput 组件，支持 @ 功能的输入框
 * @param {AtInputProps} props - 组件属性
 * @param {number} [props.height=300] - 输入框的高度
 * @param {(keyword?: string) => Promise<UserOption[]>} props.onRequest - 请求用户选项的回调函数
 * @param {(content: string, selectedUsers: UserOption[] | []) => void} props.onChange - 内容变化时的回调函数
 * @returns {JSX.Element} - 渲染的组件
 */
const AtInput: React.FC<AtInputProps> = ({ height = 300, onRequest, onChange }) => {
    // 存储输入框的内容
    const [content, setContent] = useState<string>('');
    // 控制用户选择下拉框的显示与隐藏
    const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
    // 存储用户选项列表
    const [userOptions, setUserOptions] = useState<UserOption[]>([]);
    // 存储最后一个 @ 符号的索引位置
    const [currentAtIndex, setCurrentAtIndex] = useState<number | null>(null);
    // 存储当前焦点所在的节点
    const [focusNode, setFocusNode] = useState<Node | null>(null);
    // 存储当前搜索的关键字
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    // 存储光标的位置
    const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
    // 存储选中的用户列表
    const [selectedUsers, setSelectedUsers] = useState<UserOption[]>([]);
    // 引用输入框的 DOM 元素
    const editorRef = useRef<HTMLDivElement>(null);

    /**
     * 更新光标的位置
     */
    const updateCursorPosition = useCallback(() => {
        // 获取当前的文本选择范围
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;
        // 获取选择范围的边界矩形
        const { x, y } = selection.getRangeAt(0).getBoundingClientRect();
        // 获取输入框的 DOM 元素
        const editorElement = document.querySelector('#atInput');
        if (!editorElement) return;
        // 获取输入框的边界矩形
        const { x: editorX, y: editorY } = editorElement.getBoundingClientRect();
        // 计算光标的相对位置并更新状态
        setCursorPosition({ x: x - editorX, y: y - editorY });
    }, []);

    /**
     * 获取用户选项，使用防抖处理
     * @param {string} [keyword] - 搜索关键字
     */
    const fetchUserOptions = useCallback(
        (keyword?: string) => {
            // 如果定时器存在，清除定时器
            if (debounceTimer) {
                clearTimeout(debounceTimer);
                debounceTimer = null;
            }
            // 设置新的定时器，延迟 500ms 后请求用户选项
            debounceTimer = setTimeout(async () => {
                const options = await onRequest(keyword);
                setUserOptions(options);
            }, 500);
        },
        [onRequest]
    );

    /**
     * 组件挂载时，初始化获取用户选项
     */
    useEffect(() => {
        fetchUserOptions();
    }, [fetchUserOptions]);

    /**
     * 处理输入框的观察逻辑，检测 @ 符号并更新相关状态
     */
    const handleInputObservation = useCallback(() => {
        // 获取当前的文本选择范围
        const selection = window.getSelection();
        if (!selection || !selection.focusNode) return;
        // 获取光标之前的文本
        const textBeforeCursor = (selection.focusNode as Text).data?.slice(0, selection.focusOffset) || '';
        // 更新焦点节点状态
        setFocusNode(selection.focusNode);
        // 查找最后一个 @ 符号的索引位置
        const lastAtIndex = textBeforeCursor.lastIndexOf('@');
        // 更新最后一个 @ 符号的索引位置状态
        setCurrentAtIndex(lastAtIndex);
        if (lastAtIndex !== -1) {
            // 更新光标的位置
            updateCursorPosition();
            // 获取 @ 符号后面的关键字
            const keyword = textBeforeCursor.slice(lastAtIndex + 1);
            // 检查关键字是否包含空格或换行符
            if (!StringTools.isIncludeSpacesOrLineBreak(keyword)) {
                // 更新搜索关键字状态
                setSearchKeyword(keyword);
                // 根据关键字获取用户选项
                fetchUserOptions(keyword);
                // 显示用户选择下拉框
                setDropdownVisible(true);
            } else {
                // 隐藏用户选择下拉框
                setDropdownVisible(false);
                // 清空搜索关键字状态
                setSearchKeyword('');
            }
        } else {
            // 隐藏用户选择下拉框
            setDropdownVisible(false);
        }
    }, [updateCursorPosition, fetchUserOptions]);

    /**
     * 选中 @ 符号后的用户 span 元素
     * @param {Node} target - 要选中的目标节点
     */
    const selectAtSpan = (target: Node) => {
        // 获取当前的文本选择范围
        const selection = window.getSelection();
        if (selection) {
            // 选中目标节点
            selection.getRangeAt(0).selectNode(target);
        }
    };

    /**
     * 处理输入框的点击事件
     * @param {React.MouseEvent<HTMLDivElement>} e - 鼠标点击事件
     */
    const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // 处理输入框的观察逻辑
        handleInputObservation();
        if (e.target instanceof HTMLSpanElement) {
            // 选中点击的 span 元素
            selectAtSpan(e.target);
        }
    };

    /**
     * 处理输入框内容变化事件
     * @param {React.FormEvent<HTMLDivElement>} event - 表单输入事件
     */
    const handleEditorChange = (event: React.FormEvent<HTMLDivElement>) => {
        // 获取输入框的文本内容
        const innerText = (event.target as HTMLDivElement).innerText;
        // 更新输入框内容状态
        setContent(innerText);
        // 处理输入框的观察逻辑
        handleInputObservation();
    };

    /**
     * 创建 @ 符号后的用户 span 元素
     * @param {number | string} id - 用户的 ID
     * @param {string} name - 用户的名称
     * @param {string} [color='blue'] - span 元素的颜色
     * @returns {HTMLSpanElement} - 创建的 span 元素
     */
    const createAtSpan = (id: number | string, name: string, color = 'blue') => {
        // 创建一个 span 元素
        const spanElement = document.createElement('span');
        // 添加类名
        spanElement.className = 'at-span';
        // 设置颜色
        spanElement.style.color = color;
        // 设置 ID
        spanElement.id = id.toString();
        // 设置不可编辑
        spanElement.contentEditable = 'false';
        // 设置文本内容
        spanElement.innerText = `@${name}`;
        return spanElement;
    };

    /**
     * 处理用户选择事件
     * @param {UserOption} user - 选中的用户选项
     */
    const handleUserSelect = (user: UserOption) => {
        // 获取当前的文本选择范围
        const selection = window.getSelection();
        if (!selection || !focusNode || currentAtIndex === null) return;
        // 获取选择范围
        const range = selection.getRangeAt(0);
        // 设置选择范围的起始位置
        range.setStart(focusNode, currentAtIndex);
        // 设置选择范围的结束位置
        range.setEnd(focusNode, currentAtIndex + 1 + searchKeyword.length);
        // 删除选择范围内的内容
        range.deleteContents();
        // 创建 @ 符号后的用户 span 元素
        const atSpan = createAtSpan(user.id, user.name);
        // 将 span 元素插入到选择范围内
        range.insertNode(atSpan);
        // 折叠选择范围
        range.collapse();
        // 更新选中的用户列表状态
        setSelectedUsers((prevSelected) => [...prevSelected, user]);
        // 更新输入框内容状态
        setContent(document.getElementById('atInput')?.innerText || '');
        // 隐藏用户选择下拉框
        setDropdownVisible(false);
        // 让输入框重新获取焦点
        editorRef.current?.focus();
    };

    /**
     * 过滤掉已选中但在 DOM 中不存在的用户
     * @returns {UserOption[]} - 过滤后的用户列表
     */
    const filterSelectedUsers = useCallback(() => {
        // 获取所有 @ 符号后的用户 span 元素
        const spans = document.querySelectorAll('.at-span');
        // 创建一个 Set 存储 span 元素的 ID
        const ids = new Set(Array.from(spans).map((span) => parseInt(span.id, 10)));
        // 过滤掉不在 Set 中的用户
        return selectedUsers.filter((user) => ids.has(user.id));
    }, [selectedUsers]);

    /**
     * 当选中的用户列表或输入框内容变化时，调用 onChange 回调函数
     */
    useEffect(() => {
        const filteredUsers = filterSelectedUsers();
        onChange(content, filteredUsers);
    }, [selectedUsers, content, filterSelectedUsers, onChange]);

    return (
        <div style={{ height, position: 'relative' }}>
            <div id="atInput" ref={editorRef} className="editor" contentEditable onInput={handleEditorChange} onClick={handleEditorClick} />
            <SelectUser options={userOptions} visible={isDropdownVisible} cursorPosition={cursorPosition} onSelect={handleUserSelect} />
        </div>
    );
};

export default AtInput;
