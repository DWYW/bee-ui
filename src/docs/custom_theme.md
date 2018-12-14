## 自定义主题

bee-ui提供了一套默认的主题颜色。

如需要自定义主题可以在项目的根目录下添加 theme.less


``` less
@primary-color: #ff6701;
@primary-tint-color: #ff8533;
@primary-font-color: #ffffff;
@success-color: #449d44;
@success-tint-color: #5cb85c;
@success-font-color: #ffffff;
@error-color: #e44848;
@error-tint-color: #ff5555;
@error-font-color: #ffffff;
@font-color: #333333;
@font-tint-color: #888888;
@border-color: #cccccc;
@border-radius: 4px;
@placeholder-color: #cccccc;
@line-height: 30px;
@mask-bg-color: rgba(0, 0, 0, .2);
@z-0: 1;
@z-1: 9;
@z-2: 99;

// button
@btn-width: 80px;
@btn-height: @line-height;
@btn-sm-width: 50px;
@btn-sm-height: 24px;
@btn-lg-width: 140px;
@btn-lg-height: 38px;

@btn-disabled-bg: #cccccc;

@btn-default-bg: transparent;
@btn-default-color: @font-color;
@btn-default-border-color-active: @primary-color;
@btn-default-color-active: @primary-color;
@btn-default-animation-bg: rgba(220, 220, 220, 0.3);

@btn-primary-bg: @primary-color;
@btn-primary-color: @primary-font-color;
@btn-primary-bg-hover: @primary-tint-color;
@btn-primary-bg-active: @primary-color;
@btn-primary-animation-bg: rgba(255, 255, 255, .3);

@btn-success-bg: @success-color;
@btn-success-color: @success-font-color;
@btn-success-bg-hover: @success-tint-color;
@btn-success-bg-active: @success-color;
@btn-success-animation-bg: rgba(255, 255, 255, .3);

@btn-error-bg: @error-color;
@btn-error-color: @error-font-color;
@btn-error-bg-hover: @error-tint-color;
@btn-error-bg-active: @error-color;
@btn-error-animation-bg: rgba(255, 255, 255, .3);

// input 
@ipt-height: @line-height;

// radio
@radio-color-unselected: @border-color;
@radio-color-selected: @primary-color;
@radio-line-height: @line-height;

// checkbox
@checkbox-color-unselected: @border-color;
@checkbox-color-selected: @primary-color;
@checkbox-line-height: @line-height;

// dialog 
@dlg-mask-bg-color: @mask-bg-color;
@dlg-panel-bg-color: #ffffff;
@dlg-panel-border-color: #f5f5f5;
@dlg-title-height:  50px;
@dlg-title-bg-color: #f5f5f5;
@dlg-title-color: @font-color;
@dlg-title-font-size: 16px;
@dlg-colse-color: @font-tint-color;
@dlg-body-color: @font-color;
@dlg-body-height: 128px;
@dlg-footer-btn-height: 38px;

// menu
@menu-border-color: @border-color;
@menu-arr-size: 6px;

// select
@select-border-color: @border-color;
@select-height: @line-height;
@select-min-width: 120px;
@select-bg-color: #ffffff;
@select-options-bg-color: #ffffff;
@select-options-hover-bg-color: #f5f5f5;
@select-multiple-item-bg: #f1f1f1;
@select-disabled-bg: #f5f5f5;

// picker

@picker-border-color: @border-color;
@picker-bg-color: #ffffff;
@picker-pop-width: 320px;
@picker-pop-height: 350px;
@picker-pop-header-height: 24px;
@picker-quick-btn-width: 100px;
@picker-range-selected-bg-color: #ffe8d9;
@picker-time-selected-bg-color: #f5f5f5;

// table
@table-border-color: @border-color;
@table-head-color: #333333;
@table-head-bg-color: #f5f5f5;
@table-body-color: #888888;
@table-body-bg-color: #ffffff;
@table-tr-actived-color: #ff6701;
@table-tr-actived-bg-color: rgba(255, 103, 1, .12);
@table-empty-image: url(data:image/png;base64,······U5ErkJggg==);


// switch 
@switch-width: 60px;
@switch-width-sm: 48px;
@switch-width-lg: 72px;
@switch-height: 30px;
@switch-height-sm: 24px;
@switch-height-lg: 36px;
@switch-active-bg: @primary-color;
@switch-active-border-color: @primary-color;
@switch-default-bg: @border-color;
@switch-default-border-color: @border-color;
@switch-btn-bg: #ffffff;
@switch-btn-shadow-color: @font-tint-color;

//steo
@step-icon-size: 30px;
@step-bar-height: 4px;
@step-bg: @border-color;
@step-color: #ffffff;
@step-completed-bg: @primary-color;
@step-completed-color: #ffffff;

// pagination
@pagination-btn-height: 28px;

// message
@message-width: 320px;
@message-top: 80px;
@message-warn-bg: #ffdbc1;
@message-warn-color: @primary-tint-color;
@message-success-bg: #d5f7c3;
@message-success-color: @success-color;
@message-error-bg: #ffb2b2;
@message-error-color: @error-color;

// notify
@notify-border-color: @border-color;
@notify-body-bg: #ffffff;
@notify-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
@notify-title-color: @font-color;
@notify-body-color: @font-tint-color;
@notify-success-color: @success-color;
@notify-warn-color: @primary-color;
@notify-error-color: @error-color;

// alert 
@alert-border-color: @border-color;
@alert-header-height: 46px;
@alert-header-bg: #f5f5f5;
@alert-header-color: @font-color;
@alert-close-color: @font-tint-color;
@alert-body-bg: #ffffff;
@alert-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
@alert-color: @font-color;

// tip
@tip-bg: #333333;
@tip-color: #ffffff;
@tip-font-size: 12px;
```