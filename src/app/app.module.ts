import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { MdAutocompleteModule, MdButtonModule, MdButtonToggleModule, MdCardModule,
         MdCheckboxModule, MdChipsModule, MdDatepickerModule, MdDialogModule, MdFormFieldModule,
         MdExpansionModule, MdGridListModule, MdIconModule, MdInputModule, MdListModule,
         MdMenuModule, MdNativeDateModule, MdPaginatorModule, MdProgressBarModule, MdProgressSpinnerModule,
         MdRadioModule, MdRippleModule, MdSelectModule, MdSidenavModule, MdSliderModule, MdSlideToggleModule,
         MdSnackBarModule, MdSortModule, MdTableModule, MdTabsModule, MdToolbarModule, MdTooltipModule, MdStepperModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { ControlsPopupComponent, ControlsDialog } from './controls-popup/controls-popup.component';
import { SettingsPopupComponent, SettingsDialog } from './settings-popup/settings-popup.component';
import { GameOverPopupComponent, GameOverDialog } from './game-over-popup/game-over-popup.component';
import { ScoringPopupComponent, ScoringDialog } from './scoring-popup/scoring-popup.component';
import { Gameboard } from './gameboard.module';

@NgModule({
  exports: [
    CdkTableModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdStepperModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
  ],
  declarations: [
    AppComponent,
    GridComponent,
    LeftPanelComponent,
    RightPanelComponent,
    ControlsPopupComponent,
    SettingsPopupComponent,
    GameOverPopupComponent,
    ScoringPopupComponent,
    ScoringDialog,
    GameOverDialog,
    SettingsDialog,
    ControlsDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdNativeDateModule,
    ReactiveFormsModule,
    MdFormFieldModule,
    MdDialogModule,
    CdkTableModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdStepperModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent, ScoringDialog, SettingsDialog, ControlsDialog, GameOverDialog]
})
export class AppModule { }
