// Mocks generated by Mockito 5.3.2 from annotations
// in playground_components/test/src/repositories/example_repository_test.dart.
// Do not manually edit this file.

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'dart:async' as _i9;

import 'package:mockito/mockito.dart' as _i1;
import 'package:playground_components/src/repositories/example_client/example_client.dart'
    as _i8;
import 'package:playground_components/src/repositories/models/get_default_precompiled_object_request.dart'
    as _i12;
import 'package:playground_components/src/repositories/models/get_precompiled_object_code_response.dart'
    as _i3;
import 'package:playground_components/src/repositories/models/get_precompiled_object_request.dart'
    as _i11;
import 'package:playground_components/src/repositories/models/get_precompiled_object_response.dart'
    as _i4;
import 'package:playground_components/src/repositories/models/get_precompiled_objects_request.dart'
    as _i10;
import 'package:playground_components/src/repositories/models/get_precompiled_objects_response.dart'
    as _i2;
import 'package:playground_components/src/repositories/models/get_snippet_request.dart'
    as _i13;
import 'package:playground_components/src/repositories/models/get_snippet_response.dart'
    as _i6;
import 'package:playground_components/src/repositories/models/output_response.dart'
    as _i5;
import 'package:playground_components/src/repositories/models/save_snippet_request.dart'
    as _i14;
import 'package:playground_components/src/repositories/models/save_snippet_response.dart'
    as _i7;

// ignore_for_file: type=lint
// ignore_for_file: avoid_redundant_argument_values
// ignore_for_file: avoid_setters_without_getters
// ignore_for_file: comment_references
// ignore_for_file: implementation_imports
// ignore_for_file: invalid_use_of_visible_for_testing_member
// ignore_for_file: prefer_const_constructors
// ignore_for_file: unnecessary_parenthesis
// ignore_for_file: camel_case_types
// ignore_for_file: subtype_of_sealed_class

class _FakeGetPrecompiledObjectsResponse_0 extends _i1.SmartFake
    implements _i2.GetPrecompiledObjectsResponse {
  _FakeGetPrecompiledObjectsResponse_0(
    Object parent,
    Invocation parentInvocation,
  ) : super(
          parent,
          parentInvocation,
        );
}

class _FakeGetPrecompiledObjectCodeResponse_1 extends _i1.SmartFake
    implements _i3.GetPrecompiledObjectCodeResponse {
  _FakeGetPrecompiledObjectCodeResponse_1(
    Object parent,
    Invocation parentInvocation,
  ) : super(
          parent,
          parentInvocation,
        );
}

class _FakeGetPrecompiledObjectResponse_2 extends _i1.SmartFake
    implements _i4.GetPrecompiledObjectResponse {
  _FakeGetPrecompiledObjectResponse_2(
    Object parent,
    Invocation parentInvocation,
  ) : super(
          parent,
          parentInvocation,
        );
}

class _FakeOutputResponse_3 extends _i1.SmartFake
    implements _i5.OutputResponse {
  _FakeOutputResponse_3(
    Object parent,
    Invocation parentInvocation,
  ) : super(
          parent,
          parentInvocation,
        );
}

class _FakeGetSnippetResponse_4 extends _i1.SmartFake
    implements _i6.GetSnippetResponse {
  _FakeGetSnippetResponse_4(
    Object parent,
    Invocation parentInvocation,
  ) : super(
          parent,
          parentInvocation,
        );
}

class _FakeSaveSnippetResponse_5 extends _i1.SmartFake
    implements _i7.SaveSnippetResponse {
  _FakeSaveSnippetResponse_5(
    Object parent,
    Invocation parentInvocation,
  ) : super(
          parent,
          parentInvocation,
        );
}

/// A class which mocks [ExampleClient].
///
/// See the documentation for Mockito's code generation for more information.
class MockExampleClient extends _i1.Mock implements _i8.ExampleClient {
  MockExampleClient() {
    _i1.throwOnMissingStub(this);
  }

  @override
  _i9.Future<_i2.GetPrecompiledObjectsResponse> getPrecompiledObjects(
          _i10.GetPrecompiledObjectsRequest? request) =>
      (super.noSuchMethod(
        Invocation.method(
          #getPrecompiledObjects,
          [request],
        ),
        returnValue: _i9.Future<_i2.GetPrecompiledObjectsResponse>.value(
            _FakeGetPrecompiledObjectsResponse_0(
          this,
          Invocation.method(
            #getPrecompiledObjects,
            [request],
          ),
        )),
      ) as _i9.Future<_i2.GetPrecompiledObjectsResponse>);
  @override
  _i9.Future<_i3.GetPrecompiledObjectCodeResponse> getPrecompiledObjectCode(
          _i11.GetPrecompiledObjectRequest? request) =>
      (super.noSuchMethod(
        Invocation.method(
          #getPrecompiledObjectCode,
          [request],
        ),
        returnValue: _i9.Future<_i3.GetPrecompiledObjectCodeResponse>.value(
            _FakeGetPrecompiledObjectCodeResponse_1(
          this,
          Invocation.method(
            #getPrecompiledObjectCode,
            [request],
          ),
        )),
      ) as _i9.Future<_i3.GetPrecompiledObjectCodeResponse>);
  @override
  _i9.Future<_i4.GetPrecompiledObjectResponse> getDefaultPrecompiledObject(
          _i12.GetDefaultPrecompiledObjectRequest? request) =>
      (super.noSuchMethod(
        Invocation.method(
          #getDefaultPrecompiledObject,
          [request],
        ),
        returnValue: _i9.Future<_i4.GetPrecompiledObjectResponse>.value(
            _FakeGetPrecompiledObjectResponse_2(
          this,
          Invocation.method(
            #getDefaultPrecompiledObject,
            [request],
          ),
        )),
      ) as _i9.Future<_i4.GetPrecompiledObjectResponse>);
  @override
  _i9.Future<_i4.GetPrecompiledObjectResponse> getPrecompiledObject(
          _i11.GetPrecompiledObjectRequest? request) =>
      (super.noSuchMethod(
        Invocation.method(
          #getPrecompiledObject,
          [request],
        ),
        returnValue: _i9.Future<_i4.GetPrecompiledObjectResponse>.value(
            _FakeGetPrecompiledObjectResponse_2(
          this,
          Invocation.method(
            #getPrecompiledObject,
            [request],
          ),
        )),
      ) as _i9.Future<_i4.GetPrecompiledObjectResponse>);
  @override
  _i9.Future<_i5.OutputResponse> getPrecompiledObjectOutput(
          _i11.GetPrecompiledObjectRequest? request) =>
      (super.noSuchMethod(
        Invocation.method(
          #getPrecompiledObjectOutput,
          [request],
        ),
        returnValue: _i9.Future<_i5.OutputResponse>.value(_FakeOutputResponse_3(
          this,
          Invocation.method(
            #getPrecompiledObjectOutput,
            [request],
          ),
        )),
      ) as _i9.Future<_i5.OutputResponse>);
  @override
  _i9.Future<_i5.OutputResponse> getPrecompiledObjectLogs(
          _i11.GetPrecompiledObjectRequest? request) =>
      (super.noSuchMethod(
        Invocation.method(
          #getPrecompiledObjectLogs,
          [request],
        ),
        returnValue: _i9.Future<_i5.OutputResponse>.value(_FakeOutputResponse_3(
          this,
          Invocation.method(
            #getPrecompiledObjectLogs,
            [request],
          ),
        )),
      ) as _i9.Future<_i5.OutputResponse>);
  @override
  _i9.Future<_i5.OutputResponse> getPrecompiledObjectGraph(
          _i11.GetPrecompiledObjectRequest? request) =>
      (super.noSuchMethod(
        Invocation.method(
          #getPrecompiledObjectGraph,
          [request],
        ),
        returnValue: _i9.Future<_i5.OutputResponse>.value(_FakeOutputResponse_3(
          this,
          Invocation.method(
            #getPrecompiledObjectGraph,
            [request],
          ),
        )),
      ) as _i9.Future<_i5.OutputResponse>);
  @override
  _i9.Future<_i6.GetSnippetResponse> getSnippet(
          _i13.GetSnippetRequest? request) =>
      (super.noSuchMethod(
        Invocation.method(
          #getSnippet,
          [request],
        ),
        returnValue:
            _i9.Future<_i6.GetSnippetResponse>.value(_FakeGetSnippetResponse_4(
          this,
          Invocation.method(
            #getSnippet,
            [request],
          ),
        )),
      ) as _i9.Future<_i6.GetSnippetResponse>);
  @override
  _i9.Future<_i7.SaveSnippetResponse> saveSnippet(
          _i14.SaveSnippetRequest? request) =>
      (super.noSuchMethod(
        Invocation.method(
          #saveSnippet,
          [request],
        ),
        returnValue: _i9.Future<_i7.SaveSnippetResponse>.value(
            _FakeSaveSnippetResponse_5(
          this,
          Invocation.method(
            #saveSnippet,
            [request],
          ),
        )),
      ) as _i9.Future<_i7.SaveSnippetResponse>);
}
