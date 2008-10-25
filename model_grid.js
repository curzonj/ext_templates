Ext.namespace('Templates');

Templates.ModelGrid = Ext.extend(SWorks.CustomGrid, {
  initComponent: function() {
    Ext.apply(this, {
      columns: [
        {header: 'Name', dataIndex: 'name', width:70},
      ],
      tbar: [
        { text: 'Options'}, '-',
        { xtype: 'filter' }, '-',
        { text: 'Add' }, '-',
        { text: 'Edit' }, '-',
        { text: 'Delete' }
      ],

      store: new SWorks.CrudStore('model'),
      // You may want to use a URLLoadingController here
      plugins: new SWorks.GridController(),

      editor: {
        xtype: 'form',
        items: {
          xtype: 'textfield',
          fieldLabel: 'Name',
          name: 'parent[name]',
          dataIndex: 'name',
          allowBlank: false
        }
      }
    });
  }
});
