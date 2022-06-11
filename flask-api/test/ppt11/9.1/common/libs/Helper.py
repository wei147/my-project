from flask import jsonify, g, render_template


# 渲染页面的数据
def ops_render(template, context={}):
    if 'current_user' in g:
        context['current_user'] = g.current_user
    return render_template(template, **context)


# 操作渲染 JSON
def ops_renderJSON(code=200, msg="操作成功", data={}):
    response = {"code": code, "msg": msg, "data": data}
    return jsonify(response)


# 错误处理
def ops_renderErrJSON(msg="系统繁忙，请稍后再试", data={}):
    return ops_renderJSON(code=-1, msg=msg, data=data)
