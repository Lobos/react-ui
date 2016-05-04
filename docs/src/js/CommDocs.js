module.exports = {
  TplDataDesc () {
    return (
      <div>
        <h2 className="subhead">数据结构</h2>
        <div>标准结构为 <em>text</em>, <em>id</em> key组成的数组。例: [&#123;id: 1, text: "t"&#125;]</div>
        <div>
          可以使用自定义数组，指定 <em>textTpl</em>, <em>valueTpl</em><br />
          <ul>
            <li>tpl为string时，会用data替换'&#123;&#125;'内的key值，例: '&#123;id&#125;-&#123;text&#125;'</li>
            <li>tpl为function时，会使用这个function的返回值，参数为data。例: function (d) &#123; return &lt;span&gt;&lt;i class="something" /&gt; + d.value&lt;span&gt;; &#125;</li>
          </ul>
        </div>
        <div>可以使用一维数组，这种情况下，显示文字与值相同</div>
      </div>
    );
  }
}
