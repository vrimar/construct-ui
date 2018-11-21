@# Query List
A QueryList allows an array of items to be filtered by a query string. It is composed of a `ControlGroup`, `Input` and `List` component and allows for a number of keyboard interactions:
  + The `UP` and `DOWN` arrow keys navigate through the list. 
  + The `ENTER` key selects an item. 
  + The `ESCAPE` key clears the query value in the input field.

@example QueryListExample

@## Controlled mode
The QueryList can be used in a controlled mode by passing a `query` and/or `activeIndex` attribute. When the `query` attribute is defined, the `onQueryChange` callback is invoked to change the input search value. Similarly, if `activeIndex` is defined, the `onActiveItemChange` is called whenever the active index is to be updated.
@example QueryListControlledExample

@## QueryList Attrs
@interface IQueryListAttrs
