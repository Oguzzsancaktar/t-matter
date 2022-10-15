const mergeTag = {
  // @Required
  // plugin name
  name: 'merge_tag',

  // @Required
  // data display
  display: 'submenu',

  // @Required
  // add function - It is called only once when the plugin is first run.
  // This function generates HTML to append and register the event.
  // arguments - (core : core object, targetElement : clicked button element)
  add: function (core, targetElement) {
    // Generate submenu HTML
    // Always bind "core" when calling a plugin function
    let listDiv = this.setSubmenu.call(core)

    // You must bind "core" object when registering an event.
    /** add event listeners */
    var self = this
    listDiv.querySelectorAll('.se-btn-list').forEach(function (btn) {
      btn.addEventListener('click', self.onClick.bind(core))
    })

    // @Required
    // You must add the "submenu" element using the "core.initMenuTarget" method.
    /** append target button menu */
    core.initMenuTarget(this.name, targetElement, listDiv)
  },

  setSubmenu: function () {
    const listDiv = this.util.createElement('DIV')
    // @Required
    // A "se-submenu" class is required for the top level element.
    listDiv.className = 'se-submenu se-list-layer'
    listDiv.innerHTML =
      '<div class="se-list-inner se-list-font-size"><ul class="se-list-basic"><li><button type="button" class="se-btn-list" value="{firstName}">{firstName}</button></li><li><button type="button" class="se-btn-list" value="{lastName}">{lastName}</button></li></ul></div>'

    return listDiv
  },
  onClick: function (e) {
    const value = e.target.value
    const node = this.util.createElement('span')
    this.util.addClass(node, 'se-custom-tag')
    node.textContent = value

    this.insertNode(node)
    const zeroWidthSpace = this.util.createTextNode(this.util.zeroWidthSpace)
    node.parentNode.insertBefore(zeroWidthSpace, node.nextSibling)

    this.submenuOff()
  }
}

export default mergeTag
