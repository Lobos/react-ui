# Basic
## Common
* 根据data生成正确的select
* 根据placeholder生成正确的占位符
* 根据grid定制宽度
* 根据value显示初始值

## Single
* 根据optionTpl显示选项
* 根据resultTpl显示选中项
* 根据valueTpl返回值

## Multiple
* 根据groupBy正确的分组
* 根据sep，返回值的分隔符

# Feature
* readOnly,是否为只读状态，默认为false。
* filterAble,否显示筛选，默认为false。
* mult,是否为多选，默认为false

# Behavior
* onChange(),值改变时的回调函数
* showOptions()/hideOptions(),Select菜单显示与隐藏函数
* getValue()/setValue(),Select取值与赋值函数
* formatData(),格式化数据函数
* handleChange(),onChange回调函数的handler

See more details on [ReactUI Select]

[ReactUI Select]: http://lobos.github.io/react-ui/#/select