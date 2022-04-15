import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react';
import ColorModeSwitcher from './ColorModeSwitcher';

export default () => (
  <Breadcrumb>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbSeparator />

    <BreadcrumbItem>
      <BreadcrumbLink href="#">Docs</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbSeparator />

    <BreadcrumbItem isCurrentPage>
      <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
    </BreadcrumbItem>

    <ColorModeSwitcher />
  </Breadcrumb>
);
