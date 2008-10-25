Ext.namespace('Templates');

// This assumes that you actually use a different grid class for each
// grid. Each grid class would be build around a different model.

Templates.ParentChildGrids = function(config) {
  config = config || {};

  // items can't be assigned in initComponent
  Ext.apply(config, {
    // The grids will find this controller and 
    controller: new Templates.ParentChildController(),

    layout: 'border',
    items: [
      this.parentGrid = new Templates.ModelGrid({
        region: 'north',
        // if it thinks this panel is the parent,
        // that will disable auto loading
        findParentComponent: Ext.emptyFn,
      }),
      {
        region: 'center',
        layout: 'border',
        items: [
          // These will see this panel as their
          // parent, but that is ok, because the real
          // parent (parentGrid) doesn't know how to
          // control them
          this.childGrid = new Templates.ModelGrid({
            region: 'north'
          }),
          this.grandchildGrid =new Templates.ModelGrid({
            region: 'center'
          }),
        ]
      }
    ]
  });

  Templates.ParentChildGrids.superclass.constructor.call(this, config);
}
Ext.extend(Templates.ParentChildGrids, Ext.Panel, {
  initComponent: function() {
    Templates.ParentChildGrids.superclass.initComponent.call(this);

    // This is where we basically build the custom parent child relationships
    this.parentGrid.comp.on('cellclick', this.onParentClick, this);
    this.childGrid.comp.on('cellclick', this.onChildClick, this);
  },

  onParentClick: function(grid, rowIndex, cellIndex, e) {
    var r = grid.store.getAt(rowIndex);
    this.childGrid.dataModel.loadFromRecord(r);
  },
  onChildClick: function(grid, rowIndex, cellIndex, e) {
    var r = grid.store.getAt(rowIndex);
    this.grandchildGrid.dataModel.loadFromRecord(r);
  }
});
