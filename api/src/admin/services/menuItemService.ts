import MenuItem from '../../shared/models/menuItemModel';
import factoryService from '../../shared/services/factoryService';
import IMenuItem, { INutrientType } from '../../shared/interfaces/IMenuItem';
import { NUTRIENTS } from '../../constants';

function addUnitToNutrientArrayData(menuItemData: any) {
  const nutrients = menuItemData.nutrients?.map((nutrient: INutrientType) => {
    return {
      ...nutrient,
      unit: NUTRIENTS.find((n) => n.name === nutrient.name)?.unit
    };
  });

  return nutrients || [];
}

function addMenuItem(menuItemData: any): Promise<IMenuItem> {
  const _menuItemData = {
    ...menuItemData,
    nutrients: addUnitToNutrientArrayData(menuItemData)
  };

  return factoryService.createOne(MenuItem, _menuItemData);
}

function updateMenuItem(menuItem: IMenuItem, menuItemData: any): Promise<IMenuItem> {
  const _menuItemData = {
    ...menuItemData,
    nutrients: addUnitToNutrientArrayData(menuItemData)
  };

  return factoryService.updateOne(MenuItem, null, _menuItemData, 'Menu Item', menuItem);
}

export default { addMenuItem, updateMenuItem };
