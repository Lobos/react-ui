'use strict';

import Code from './Code';

module.exports = {
  TplDataDesc () {
    return (
      <div>
        <h2 className="subhead">数据结构</h2>
        <div>标准结构为 <em>text</em>, <em>id</em> key组成的数组。</div>
        <Code>{'[{"text":"北京","id":"beijing"},{"text":"上海", "id":"shanghai"}]'}</Code>
        <div>
          可以使用自定义数组，指定 <em>textTpl</em>, <em>valueTpl</em><br />
          <Code>{'[{"cn":"北京","en":"beijing"},{"cn":"上海", "en":"shanghai"}]'}</Code>
          <ul>
            <li>tpl为string时，会用data替换'&#123;&#125;'内的key值。<br />
            例: '&#123;cn&#125;-&#123;en&#125;' => 北京-beijing</li>
            <li>tpl为function时，会使用这个function的返回值，参数为data。<br />
            例: function (d) &#123; return &lt;span&gt;&lt;b&gt;&#123;d.cn&#125;&lt;/b&gt; / &#123;d.en&#125;&lt;span&gt;; &#125; => <b>北京</b> / beijing</li>
          </ul>
        </div>
        <div>可以使用一维数组，这种情况下，显示文字与值相同</div>
        <Code>{'["北京","上海","广州"]'}</Code>
      </div>
    );
  }
};
