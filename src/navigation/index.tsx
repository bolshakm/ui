import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTER_KEYS } from '../common/constants';
import { MenuPage } from '../pages/menu';
import { CartPage } from '../pages/cart';
import { RequestBillPage } from '../pages/request-bill';
import { SuccessBillPage } from '../pages/success-bill';
import { useAppDispatch, useAppSelector } from '../store/app/hooks';
import { selectCafe } from '../store/slices/cafe/cafe.slice';
import { ActionsPage } from '../pages/actions';
import { ModeEnum } from '../types/mode.enum';
import { useEffect } from 'react';
import { selectLanguage, setLanguage } from '../store/slices/menu/menu.slice';
import { Language } from '../types';

export const Router = () => {
  const { cafeId, tableId } = useAppSelector(selectCafe);
  const language = useAppSelector(selectLanguage);
  const { cafe } = useAppSelector(selectCafe);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cafe && !language) {
      dispatch(setLanguage(cafe.defLang.toUpperCase() as Language || 'EN'))
    }
  }, [dispatch, cafe, language])

  return (
    <Routes>
      <Route path={ROUTER_KEYS.HOME} element={<Navigate to={`${ROUTER_KEYS.MENU}/${cafeId}/${tableId}`} replace />} />
      <Route path={`${ROUTER_KEYS.MENU}/:cafeId/:tableId`} element={<MenuPage />} />
      <Route path={`${ROUTER_KEYS.MENU_READ}/:cafeId/:tableId`} element={<MenuPage mode={ModeEnum.readonly} />} />
      <Route path={`${ROUTER_KEYS.MENU_ACTIONS}/:cafeId/:tableId`} element={<ActionsPage />} />
      <Route path={ROUTER_KEYS.ORDER_UPDATE} element={<CartPage mode={ModeEnum.update} />} />
      <Route path={ROUTER_KEYS.CART} element={<CartPage />} />
      <Route path={ROUTER_KEYS.REQUEST_BILL} element={<RequestBillPage />} />
      <Route path={ROUTER_KEYS.SUCCESS_BILL} element={<SuccessBillPage />} />
      <Route path={ROUTER_KEYS.ANOTHER} element={<Navigate to={`${ROUTER_KEYS.MENU}/${cafeId}/${tableId}`} replace />} />
    </Routes>
  );
};